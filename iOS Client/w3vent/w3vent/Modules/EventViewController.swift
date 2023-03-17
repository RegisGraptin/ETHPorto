//
//  EventViewController.swift
//  Greenroom
//
//  Created by Alok Sahay on 17.03.2023.
//

import Foundation
import UIKit

class EventViewController: BaseViewController  {
    
    var backgroundImageCounter: Int = 0
    
    @IBOutlet weak var backgroundImageView: UIImageView!
    
    
    @IBAction func EventButtonDidPress(_ sender: Any) {
        if backgroundImageCounter % 2 == 0 {
            backgroundImageView.image = UIImage.init(named: "AttendeesAtEvent")
        } else {
            backgroundImageView.image = UIImage.init(named: "Profile")
        }
        backgroundImageCounter += 1
    }
    
}
