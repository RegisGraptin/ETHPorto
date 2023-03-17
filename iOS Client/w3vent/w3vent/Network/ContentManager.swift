//
//  ContentManager.swift
//  Greenroom
//
//  Created by Alok Sahay on 17.03.2023.
//

import Foundation
import WalletConnectSwift

class ContentManager {
    
    var walletConnectClient: WalletConnect?
    var userAddress: String?
    static var shared = ContentManager()
    
    func startUserSession(wcClient: WalletConnect) -> Bool {
        walletConnectClient = wcClient
        
        guard let walletAddress = wcClient.session.walletInfo?.accounts[0] else {
            return false
        }
        
        self.userAddress = walletAddress
        return true
    }
    
    func closeSession() {
        
        guard let walletConnect = self.walletConnectClient, let client = walletConnect.client else {
            return
        }
        
        for session in walletConnect.client.openSessions() {
            try? client.disconnect(from: session)
        }

        walletConnectClient = nil
        self.userAddress = nil
    }
}
