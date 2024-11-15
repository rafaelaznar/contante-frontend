import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IApunte } from '../../../model/apunte.interface';
import { ApunteService } from '../../../service/apunte.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-apunte.admin.view.routed',
  templateUrl: './apunte.admin.view.routed.component.html',
  styleUrls: ['./apunte.admin.view.routed.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ApunteAdminViewRoutedComponent implements OnInit {
  id: number = 0;
  route: string = '';
  oApunte: IApunte = {
    id: 0,
    debe: 0,
    haber: 0,
    descripcion: '',
    comentarios: '',
    momentstamp: new Date(),
    orden: 0,
    id_asiento: 0,
    id_subcuenta: 0,
    id_tipoapunte: 0,
  };
  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oApunteService: ApunteService
  ) {}

  ngOnInit() {
    this.id = this.oActivatedRoute.snapshot.params['id'];
    this.getOne();
  }
getOne() {
    this.oApunteService.getOne(this.id).subscribe({
      next: (data: IApunte) => {
        this.oApunte = data;
      },
    });
  }
}
