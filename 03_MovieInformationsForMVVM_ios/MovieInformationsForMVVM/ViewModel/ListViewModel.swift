//
//  ListViewModel.swift
//  MovieInformationsForMVVM
//
//  Created by TAEHUN YU on 2022/02/09.
//

import RxSwift
import RxCocoa
import Alamofire

struct ListViewModel {
    let disposeBag = DisposeBag()
    
    
    init() {
        getNetwork(str: URL(string: "http://152.70.83.243:3000/api/list"))
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
                    
//                    var country = [GenreCode]()
//                    if let value = getInstance.rows, value.count > 0 {
//                        for row in value {
//                            print("value", row.runningValue, row.genreValue, row.countryValue)
//                            if let c = row.genreValue {
//                                country += c
//                            }
//                        }
//                    }
//                    let set: Set = Set(country)
//                    country = Array(set)
//                    print("running array:", country)
                    
//                    self.movie = getInstance
//                    self.isLoading.value = (self.isLoading.value ? false : true)
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
