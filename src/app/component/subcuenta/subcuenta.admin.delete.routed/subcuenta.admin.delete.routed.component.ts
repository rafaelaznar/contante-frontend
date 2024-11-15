import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ISubcuenta } from '../../../model/subcuenta.interface';
import { SubcuentaService } from '../../../service/subcuenta.service';


declare let bootstrap: any;
@Component({
  selector: 'app-subcuenta.admin.delete.routed',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './subcuenta.admin.delete.routed.component.html',
  styleUrls: ['./subcuenta.admin.delete.routed.component.css'],
})
export class SubcuentaAdminDeleteRoutedComponent implements OnInit {

  oSubcuenta: ISubcuenta | null = null;
  strMessage: string = '';
  myModal: any;

  constructor(
    private oSubcuentaService: SubcuentaService,
    private oActivatedRoute: ActivatedRoute,
    private oRouter: Router
  ) {}

  ngOnInit(): void {
    let id = this.oActivatedRoute.snapshot.params['id'];
    this.oSubcuentaService.get(id).subscribe({
      next: (oSubcuenta: ISubcuenta) => {
        this.oSubcuenta = oSubcuenta;
      },
      error: (err) => {
        this.showModal('Error al cargar el Subcuenta');
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
    this.oSubcuentaService.delete(this.oSubcuenta!.id).subscribe({
      next: (data) => {
        this.showModal(
          'Subcuenta con id ' + this.oSubcuenta!.id + ' ha sido borrado'
        );
      },
      error: (error) => {
        this.showModal('Error al borrar la Subcuenta');
      },
    });
  }

  cancel(): void {
    this.oRouter.navigate(['/admin/subcuenta/plist']);
  }

  hideModal = () => {
    this.myModal.hide();
    this.oRouter.navigate(['/admin/subcuenta/plist']);
  };
}
