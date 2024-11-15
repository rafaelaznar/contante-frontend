import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AsientoService } from '../../../service/asiento.service';
import { IAsiento } from '../../../model/asiento.interface';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-asiento.admin.view.routed',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './asiento.admin.view.routed.component.html',
  styleUrls: ['./asiento.admin.view.routed.component.css']
})
export class AsientoAdminViewRoutedComponent implements OnInit {
  id: number = 0;
  route: string = '';
  oAsiento: IAsiento = {
    id: 0,
    descripcion: '',
    comentarios: '',
    inventariable: 0,
    momentstamp: new Date(),
    id_tipoasiento: 0,
    id_usuario: 0,
    id_periodo: 0,
  };
  constructor(private oActivatedRoute: ActivatedRoute, private oAsientoService: AsientoService) { }

  ngOnInit() {
    this.id = this.oActivatedRoute.snapshot.params['id'];
    this.getOne();
  }
  getOne() {
    this.oAsientoService.getOne(this.id).subscribe({
      next: (data: IAsiento) => {
        this.oAsiento = data;
      },
    });
  }
}