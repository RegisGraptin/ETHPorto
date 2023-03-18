//
//  ViewController.swift
//  w3vent
//
//  Created by Alok Sahay on 11/06/2022.
//

import UIKit

class MainViewController: UIViewController {
    var handshakeController: HandshakeViewController!
    var detailController: DetailViewController!
    var walletConnect: WalletConnect!

    @IBAction func connect(_ sender: Any) {
        
        let connectionUrl = walletConnect.connect()

        /// https://docs.walletconnect.org/mobile-linking#for-ios
        /// **NOTE**: Majority of wallets support universal links that you should normally use in production application
        /// Here deep link provided for integration with server test app only
        let deepLinkUrl = "wc://wc?uri=\(connectionUrl)"
        
        // depends what you want
        let rainbowUrl = URL(string: "https://rnbwapp.com/wc?uri=\(connectionUrl.addingPercentEncoding(withAllowedCharacters: .controlCharacters) ?? "")")
        let metamaskUrl = URL(string: "https://metamask.app.link/wc?uri=\(connectionUrl.addingPercentEncoding(withAllowedCharacters: .alphanumerics) ?? "")")

        DispatchQueue.main.asyncAfter(deadline: .now() + 1) {
            if let url = URL(string: deepLinkUrl), UIApplication.shared.canOpenURL(metamaskUrl!) {
                UIApplication.shared.open(metamaskUrl!, options: [:], completionHandler: nil)
            } else {
                self.handshakeController = HandshakeViewController.create(code: connectionUrl)
                self.present(self.handshakeController, animated: true)
            }
        }
        
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        walletConnect = WalletConnect(delegate: self)
        walletConnect.reconnectIfNeeded()
    }

    func gotoDashboard() {
        performSegue(withIdentifier: "dashboard", sender: nil)
    }
    
    
    func onMainThread(_ closure: @escaping () -> Void) {
        if Thread.isMainThread {
            closure()
        } else {
            DispatchQueue.main.async {
                closure()
            }
        }
    }
}

extension MainViewController: WalletConnectDelegate {
    func failedToConnect() {
        onMainThread { [unowned self] in
            if let handshakeController = self.handshakeController {
                handshakeController.dismiss(animated: true)
            }
            UIAlertController.showFailedToConnect(from: self)
        }
    }

    func didConnect() {
        onMainThread { [unowned self] in
            self.detailController = DetailViewController.create(walletConnect: self.walletConnect)
            if let handshakeController = self.handshakeController {
                handshakeController.dismiss(animated: false) { [unowned self] in
                    self.present(self.detailController, animated: false)
                }
            } else if self.presentedViewController == nil {
                self.present(self.detailController, animated: false)
            }
        }
    }

    func didDisconnect() {
        onMainThread { [unowned self] in
            if let presented = self.presentedViewController {
                presented.dismiss(animated: false)
            }
            UIAlertController.showDisconnected(from: self)
        }
    }
}
