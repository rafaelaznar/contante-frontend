import { Component, OnInit } from '@angular/core';
import { PeriodoService } from '../../../service/periodo.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IPeriodo } from '../../../model/periodo.interface';

declare let bootstrap: any;

@Component({
  selector: 'app-periodo-admin-delete-routed',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './periodo.admin.delete.routed.component.html',
  styleUrls: ['./periodo.admin.delete.routed.component.css'],
})
export class PeriodoAdminDeleteRoutedComponent implements OnInit {
  oPeriodo: IPeriodo | null = null;
  strMessage: string = '';
  myModal: any;

  constructor(
    private oPeriodoService: PeriodoService,
    private oActivatedRoute: ActivatedRoute,
    private oRouter: Router
  ) {}

  ngOnInit(): void {
    let id = this.oActivatedRoute.snapshot.params['id'];
    this.oPeriodoService.get(id).subscribe({
      next: (oPeriodo: IPeriodo) => {
        this.oPeriodo = oPeriodo;
      },
      error: (err) => {
        this.showModal('Error al cargar el periodo');
      },
    });
  }

  showModal(mensaje: string) {
    this.strMessage = mensaje;
    this.myModal = new bootstrap.Modal(document.getElementById('mimodal'), {
      keyboard: false,
    });
    this.myModal.show();
  }

  delete(): void {
    this.oPeriodoService.delete(this.oPeriodo!.id).subscribe({
      next: (data) => {
        this.showModal(
          'Periodo con id ' + this.oPeriodo!.id + ' ha sido borrado'
        );
      },
      error: (error) => {
        this.showModal('Error al borrar el periodo');
      },
    });
  }

  hideModal = () => {
    this.myModal.hide();
    this.oRouter.navigate(['/admin/periodo/plist']);
  }
}
