import { Component, OnInit } from '@angular/core';
import { ITipoAsiento } from '../../../model/tipoAsiento.interface';
import { TipoAsientoService } from '../../../service/tipoAsiento.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tipoAsiento.admin.view.routed',
  templateUrl: './tipoAsiento.admin.view.routed.component.html',
  styleUrls: ['./tipoAsiento.admin.view.routed.component.css']
})
export class TipoAsientoAdminViewRoutedComponent implements OnInit {
  id: number = 0;
  route: string = '';
  oTipoAsiento: ITipoAsiento = {
    id: 0,
    descripcion: ''
  };
  constructor(private oActivatedRoute: ActivatedRoute, private oTipoAsientoService: TipoAsientoService) { }

  ngOnInit() {
    this.id = this.oActivatedRoute.snapshot.params['id'];
    this.getOne();
  }
  getOne() {
    this.oTipoAsientoService.getOne(this.id).subscribe({
      next: (data: ITipoAsiento) => {
        this.oTipoAsiento = data;
      },
    });
  }

}
