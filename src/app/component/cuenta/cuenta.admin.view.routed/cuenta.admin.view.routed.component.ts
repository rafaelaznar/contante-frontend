import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CuentaService } from '../../../service/cuenta.service';
import { ICuenta } from '../../../model/cuenta.interface';

@Component({
  selector: 'app-cuenta.admin.view.routed',
  templateUrl: './cuenta.admin.view.routed.component.html',
  styleUrls: ['./cuenta.admin.view.routed.component.css'],
})
export class CuentaAdminViewRoutedComponent implements OnInit {
  id: number = 0;
  route: string = '';
  oCuenta: ICuenta = {
    id: 0,
    codigo: '',
    descripcion: '',
    id_tipocuenta: 0,
  };
  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oCuentaService: CuentaService
  ) {}

  ngOnInit() {
    this.id = this.oActivatedRoute.snapshot.params['id'];
    this.getOne();
  }
  getOne() {
    this.oCuentaService.getOne(this.id).subscribe({
      next: (data: ICuenta) => {
        this.oCuenta = data;
      },
    });
  }
}
