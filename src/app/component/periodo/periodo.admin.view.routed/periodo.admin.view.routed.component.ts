import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeriodoService } from '../../../service/periodo.service';
import { IPeriodo } from '../../../model/periodo.interface';

@Component({
  standalone: true,
  selector: 'app-periodo-admin-view-routed',
  templateUrl: './periodo.admin.view.routed.component.html',
  styleUrls: ['./periodo.admin.view.routed.component.css']
})
export class PeriodoAdminViewRoutedComponent implements OnInit {
  id: number = 0;
  route: string = '';
  oPeriodo: IPeriodo = {
    id: 0,
    anyo: 0,
    descripcion: '',
    comentarios: '',
    cerrado: false,
  };

  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oPeriodoService: PeriodoService
  ) {}

  ngOnInit() {
    this.id = this.oActivatedRoute.snapshot.params['id'];
    this.getOne();
  }

  getOne() {
    this.oPeriodoService.getOne(this.id).subscribe({
      next: (data: IPeriodo) => {
        this.oPeriodo = data;
      },
    });
  }
}
