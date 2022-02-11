//
//  MovieModel.swift
//  MovieInformationsForMVVM
//
//  Created by TAEHUN YU on 2022/02/09.
//

import Foundation
import UIKit

// MARK: - QngResultModel
struct MovieModel: Codable {
    var result: ResultType
    var total: Int?
    var rows: [MovieModelRows]?
}

// MARK: - Row
struct MovieModelRows: Codable {
    var seq, sequence: Int?
    var title, country, genre, running: String?
    var rating: String?
    var director: String?
    var opendate: String?
    var thumbnail: String?
    var detailurl: String?
    
    var ratingValue: RatingCode? {
        guard let string = rating else { return nil }
        return RatingCode(string)
    }
    
    var countryValue: [CountryCode]? {
        guard let string = country, string.count > 0 else { return nil }
        let value = string.components(separatedBy: ",")
        var resp = [CountryCode]()
        for key in value {
            if let genre = CountryCode(rawValue: key) { resp.append(genre) }
        }
        return resp
    }
    
    var genreValue: [GenreCode]? {
        guard let string = genre, string.count > 0 else { return nil }
        let value = string.components(separatedBy: ",")
        var resp = [GenreCode]()
        for key in value {
            if let genre = GenreCode(rawValue: key) { resp.append(genre) }
        }
        return resp
    }
    
    var runningValue: Int? {
        guard let string = running else { return nil }
        let num = string.components(separatedBy: " ")
        if num.count == 2 {
            let strToNum = num[0].trimmingCharacters(in: ["분", "초"])
            return Int(strToNum)
        }
        return nil
    }
    
    var thumbnailUrl: URL? {
        guard let string = thumbnail else { return nil }
        return URL(string: string)
    }
    
    var webUrl: URL? {
        guard let string = detailurl else { return nil }
        return URL(string: string)
    }
}

enum Opendate: String, Codable {
    case the1998년 = "1998년"
    case the1999년 = "1999년"
    case the2000년 = "2000년"
    case the2001년 = "2001년"
    case the2002년 = "2002년"
    case the2003년 = "2003년"
    case the2004년 = "2004년"
    case the2005년 = "2005년"
    case the2006년 = "2006년"
    case the2007년 = "2007년"
    case the2008년 = "2008년"
    case the2009년 = "2009년"
    case the2010년 = "2010년"
    case the2011년 = "2011년"
    case the2012년 = "2012년"
    case the2013년 = "2013년"
    case the2014년 = "2014년"
    case the2015년 = "2015년"
    case the2016년 = "2016년"
    case the2017년 = "2017년"
    case the2018년 = "2018년"
    case the2019년 = "2019년"
}

enum RatingCode {
    case twelve
    case fifteen
    case eighteen
    case all
    case unknown
    
    init(_ param: String) {
        switch param {
        case "12세관람가"                       : self = .twelve
        case "12세이상관람가"                    : self = .twelve
        case "15세관람가"                       : self = .fifteen
        case "15세 미만인 자는 관람할 수 없는 등급"   : self = .fifteen
        case "15세이상관람가"                     : self = .fifteen
        case "18세관람가"                       : self = .eighteen
        case "전체관람가"                        : self = .all
        case "청소년관람불가"                      : self = .eighteen
        default                                 : self = .unknown
        }
    }
    
    var string: String? {
        switch self {
        case .twelve:
            return "12세 관람가"
        case .fifteen:
            return "15세 관람가"
        case .eighteen:
            return "청소년 관람불가"
        case .all:
            return "전체 관람가"
        case .unknown:
            return nil
        }
    }
}

enum CountryCode: String, Codable {
    case Belgium = "벨기에"
    case UK = "영국"
    case France = "프랑스"
    case Czech = "체코"
    case Austrelia = "호주"
    case NewZealand = "뉴질랜드"
    case China = "중국"
    case USA = "미국"
    case Canada = "캐나다"
    case HongKong = "홍콩"
    case Genmany = "독일"
    case Japan = "일본"
    case Korea = "한국"
    case Thailand = "태국"
}

enum GenreCode: String, Codable {
    case crime = "범죄"
    case mistery = "미스터리"
    case etc = "기타"
    case comedy = "코미디"
    case war = "전쟁"
    case history = "사극"
    case thriller = "스릴러"
    case action = "액션"
    case fantasy = "판타지"
    case advanture = "어드벤처"
    case horor = "공포(호러)"
    case animation = "애니메이션"
    case family = "가족"
    case western = "서부극(웨스턴)"
    case musical = "뮤지컬"
    case sf = "SF"
    case drama = "드라마"
    case romance = "멜로/로맨스"
    case dacumantary = "다큐멘터리"
}
