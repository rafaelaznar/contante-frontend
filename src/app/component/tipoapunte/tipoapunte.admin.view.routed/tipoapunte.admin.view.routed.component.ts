import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ITipoApunte } from '../../../model/tipoapunte.interface';
import { TipoApunteService } from '../../../service/tipoapunte.service';

@Component({
  selector: 'app-tipoapunte.admin.view.routed',
  templateUrl: './tipoapunte.admin.view.routed.component.html',
  styleUrls: ['./tipoapunte.admin.view.routed.component.css']
})
export class TipoApunteAdminViewRoutedComponent implements OnInit {
  id: number = 0;
  route: string = '';
  oTipoApunte: ITipoApunte = {
    id: 0,
    descripcion: '',
    comentarios: '',
  };
  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oTipoApunteService: TipoApunteService
  ) { }

  ngOnInit() {
    this.id = this.oActivatedRoute.snapshot.params['id'];
    this.getOne();
  }
getOne() {
    this.oTipoApunteService.getOne(this.id).subscribe({
      next: (data: ITipoApunte) => {
        this.oTipoApunte = data;
      },
    });
  }

}
