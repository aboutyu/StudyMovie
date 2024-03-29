//
//  MovieStore.swift
//  MovieInformationsForMVVM
//
//  Created by TAEHUN YU on 2022/02/15.
//

import Foundation
import Alamofire

struct MovieStore {
    
    let url: String = "http://152.70.83.243:3000/api/list"
    
    init() {
        getNetwork(str: URL(string: self.url))
    }
    
    private func getNetwork(str: URL?) {
        guard let url = str else {
            print("URL이 잘못 되었습니다. nil이 입력되었네요.")
            return
        }
        
        let convertable = URLRequest(url: url)
        AF.request(convertable).responseJSON { (resp) in
            switch resp.result {
            case .success(let data):
                guard let nsd = data as? NSDictionary else { return }
                
                do {
                    let json = try JSONSerialization.data(withJSONObject: nsd, options: .prettyPrinted)
                    let getInstance = try JSONDecoder().decode(MovieModel.self, from: json)
                    print("genInstance", getInstance)
                } catch {
                    print(error.localizedDescription)
                }
                
            case .failure(let error
            ):
                print("error", error)
            }
        }
    }
}
