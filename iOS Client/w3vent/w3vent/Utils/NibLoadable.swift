//
//  NibLoadable.swift
//  Greenroom
//
//  Created by Alok Sahay on 17.03.2023.
//

import Foundation
import UIKit

protocol NibLoadable {
}

extension NibLoadable {
    static var defaultNibName: String {
        String(describing: self)
    }
    static var nib: UINib? {
        UINib(nibName: defaultNibName, bundle: nil)
    }
}
