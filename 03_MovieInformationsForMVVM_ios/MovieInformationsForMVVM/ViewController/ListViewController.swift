//
//  ViewController.swift
//  MovieInformationsForMVVM
//
//  Created by TAEHUN YU on 2022/02/09.
//

import UIKit
import RxSwift

class ListViewController: UIViewController {

    @IBOutlet weak var tableView: THTableView!
    
    let viewModel = ListViewModel()
    let disposeBag = DisposeBag()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        initTableView()
        bindViewModel()
    }

    fileprivate func bindViewModel() {
        
    }
    
    fileprivate func initTableView() {
        tableView.delegate = self
        tableView.dataSource = self
        
        print("리로드 시작")
        tableView.reloadData()
        tableView.performBatchUpdates {
            print("배치 업데이트")
        } completion: { bool in
            print("배치종료", bool)
        }

//        tableView.reloadDataWithCompletion {
//            print("리로드 끝")
//        }
    }
}

extension ListViewController: UITableViewDelegate, UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return 10
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        return UITableViewCell()
    }
}

class THTableView: UITableView {
    private var reloadDataCompletionBlock: (() -> Void)?
    
    func reloadDataWithCompletion(_ completion: @escaping () -> Void) {
        reloadDataCompletionBlock = completion
        super.reloadData()
    }
    
    override func layoutSubviews() {
        super.layoutSubviews()
        if let block = reloadDataCompletionBlock {
            block()
        }
    }
}
