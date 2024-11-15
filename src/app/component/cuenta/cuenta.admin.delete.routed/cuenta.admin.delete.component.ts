import { Component, OnInit } from '@angular/core';
import { CuentaService } from '../../../service/cuenta.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ICuenta } from '../../../model/cuenta.interface';

declare let bootstrap: any;

@Component({
  selector: 'app-cuenta-admin-delete-routed',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './cuenta.admin.delete.component.html',
  styleUrl: './cuenta.admin.delete.component.css',
})
export class CuentaAdminDeleteRoutedComponent implements OnInit {
  oCuenta: ICuenta | null = null;
  strMessage: string = '';
  myModal: any;

  constructor(
    private oCuentaService: CuentaService,
    private oActivatedRoute: ActivatedRoute,
    private oRouter: Router
  ) {}

  ngOnInit(): void {
    let id = this.oActivatedRoute.snapshot.params['id'];
    this.oCuentaService.get(id).subscribe({
      next: (oCuenta: ICuenta) => {
        this.oCuenta = oCuenta;
      },
      error: (err) => {
        this.showModal('Error al cargar el cuenta');
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
    this.oCuentaService.delete(this.oCuenta!.id).subscribe({
      next: (data) => {
        this.showModal(
          'Cuenta con id ' + this.oCuenta!.id + ' ha sido borrado'
        );
      },
      error: (error) => {
        this.showModal('Error al borrar el cuenta');
      },
    });
  }

  cancel(): void {
    this.oRouter.navigate(['/admin/cuenta/plist']);
  }

  hideModal = () => {
    this.myModal.hide();
    this.oRouter.navigate(['/admin/cuenta/plist']);
  };
}
