import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ITipoapunte } from '../../../model/tipoapunte.interface';
import { TipoApunteService } from '../../../service/tipoapunte.service';

declare let bootstrap: any;

@Component({
  selector: 'app-tipoapunte.admin.delete.routed',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './tipoapunte.admin.delete.routed.component.html',
  styleUrls: ['./tipoapunte.admin.delete.routed.component.css']
})
export class TipoApunteAdminDeleteRoutedComponent implements OnInit {
  oTipoApunte: ITipoapunte | null = null;
  strMessage: string = '';
  myModal: any;

  constructor(  
    private oTipoApunteService: TipoApunteService,
    private oActivatedRoute: ActivatedRoute,
    private oRouter: Router) { }

    ngOnInit(): void {
      let id = this.oActivatedRoute.snapshot.params['id'];
      this.oTipoApunteService.get(id).subscribe({
        next: (oTipoApunte: ITipoapunte) => {
          this.oTipoApunte = oTipoApunte;
        },
        error: (err) => {
          this.showModal('Error al cargar el Tipo de Apunte');
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
      this.oTipoApunteService.delete(this.oTipoApunte!.id).subscribe({
        next: (data) => {
          this.showModal(
            'Apunte con id ' + this.oTipoApunte!.id + ' ha sido borrado'
          );
        },
        error: (error) => {
          this.showModal('Error al borrar el Tipo de Apunte');
        },
      });
    }
  
    cancel(): void {
      this.oRouter.navigate(['/admin/tipoapunte/plist']);
    }
  
    hideModal = () => {
      this.myModal.hide();
      this.oRouter.navigate(['/admin/tipoapunte/plist']);
    };
}
