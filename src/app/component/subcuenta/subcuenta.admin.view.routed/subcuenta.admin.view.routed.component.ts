import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ISubcuenta } from '../../../model/subcuenta.interface';
import { SubcuentaService } from '../../../service/subcuenta.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-subcuenta.admin.view.routed',
  templateUrl: './subcuenta.admin.view.routed.component.html',
  styleUrls: ['./subcuenta.admin.view.routed.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class SubcuentaAdminViewRoutedComponent implements OnInit {
  id: number = 0;
  route: string = '';
  oSubcuenta: ISubcuenta = {} as ISubcuenta; 
  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oSubcuentaService: SubcuentaService
  ) { }

  ngOnInit() {
    this.id = this.oActivatedRoute.snapshot.params['id'];
    this.getOne();
  }

  getOne() {
    this.oSubcuentaService.getOne(this.id).subscribe({
      next: (data: ISubcuenta) => {
        this.oSubcuenta = data;
      },
    });
  }


}
