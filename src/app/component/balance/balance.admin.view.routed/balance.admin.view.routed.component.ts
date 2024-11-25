import { Component, OnInit } from '@angular/core';
import { IBalance } from '../../../model/balance.interface';
import { ActivatedRoute } from '@angular/router';
import { BalanceService } from '../../../service/balance.service';

@Component({
  selector: 'app-balance.admin.view.routed',
  templateUrl: './balance.admin.view.routed.component.html',
  styleUrls: ['./balance.admin.view.routed.component.css']
})
export class BalanceAdminViewRoutedComponent implements OnInit {

  id: number = 0;
  route: string = '';
  oBalance: IBalance = {} as IBalance;

  constructor(private oActivatedRoute: ActivatedRoute, private oBalanceService: BalanceService) { }

  ngOnInit() {
    this.id = this.oActivatedRoute.snapshot.params['id'];
    this.getOne();
  }
  getOne() {
    this.oBalanceService.getOne(this.id).subscribe({
      next: (data: IBalance) => {
        this.oBalance = data;
      },
    });
  }
}