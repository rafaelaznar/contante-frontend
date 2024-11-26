import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IApunte } from '../../../model/apunte.interface';
import { ApunteService } from '../../../service/apunte.service';

declare let bootstrap: any;

@Component({
  selector: 'app-apunte-admin-delete-routed',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './apunte.admin.delete.component.html',
  styleUrl: './apunte.admin.delete.component.css',
})
export class ApunteAdminDeleteRoutedComponent implements OnInit {
  oApunte: IApunte | null = null;
  strMessage: string = '';
  myModal: any;

  constructor(
    private oApunteService: ApunteService,
    private oActivatedRoute: ActivatedRoute,
    private oRouter: Router
  ) {}

  ngOnInit(): void {
    let id = this.oActivatedRoute.snapshot.params['id'];
    this.oApunteService.get(id).subscribe({
      next: (oApunte: IApunte) => {
        this.oApunte = oApunte;
      },
      error: (err) => {
        this.showModal('Error al cargar el Apunte');
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
    this.oApunteService.delete(this.oApunte!.id).subscribe({
      next: (data) => {
        this.showModal(
          'Apunte con id ' + this.oApunte!.id + ' ha sido borrado'
        );
      },
      error: (error) => {
        this.showModal('Error al borrar el Apunte');
      },
    });
  }

  cancel(): void {
    this.oRouter.navigate(['/admin/apunte/plist']);
  }

  hideModal = () => {
    this.myModal.hide();
    this.oRouter.navigate(['/admin/apunte/plist']);
  };
}
