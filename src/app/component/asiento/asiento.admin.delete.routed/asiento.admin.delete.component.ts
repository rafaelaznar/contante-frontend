import { Component, OnInit } from '@angular/core';
import { AsientoService } from '../../../service/asiento.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IAsiento } from '../../../model/asiento.interface';

declare let bootstrap: any;

@Component({
  selector: 'app-asiento-admin-delete-routed',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './asiento.admin.delete.component.html',
  styleUrl: './asiento.admin.delete.component.css',
})
export class AsientoAdminDeleteRoutedComponent implements OnInit {
  oAsiento: IAsiento = {} as IAsiento;
  strMessage: string = '';
  myModal: any;

  constructor(
    private oAsientoService: AsientoService,
    private oActivatedRoute: ActivatedRoute,
    private oRouter: Router
  ) {}

  ngOnInit(): void {
    let id = this.oActivatedRoute.snapshot.params['id'];
    this.oAsientoService.get(id).subscribe({
      next: (oAsiento: IAsiento) => {
        this.oAsiento = oAsiento;
      },
      error: (err) => {
        this.showModal('Error al cargar el Asiento');
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
    this.oAsientoService.delete(this.oAsiento!.id).subscribe({
      next: (data) => {
        this.showModal(
          'Asiento con id ' + this.oAsiento!.id + ' ha sido borrado'
        );
      },
      error: (error) => {
        this.showModal('Error al borrar el asiento');
      },
    });
  }

  hideModal = () => {
    this.myModal.hide();
    this.oRouter.navigate(['/admin/asiento/plist']);
  }
  
}
