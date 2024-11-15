import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IBalance } from '../../../model/balance.interface';
import { BalanceService } from '../../../service/balance.service';

declare let bootstrap: any;

@Component({
  selector: 'app-balance.admin.delete.routed',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './balance.admin.delete.routed.component.html',
  styleUrls: ['./balance.admin.delete.routed.component.css']
})
export class BalanceAdminDeleteRoutedComponent implements OnInit {
  oBalance: IBalance | null = null;
  strMessage: string = '';
  myModal: any;

  constructor(
    private oBalanceService: BalanceService,
    private oActivatedRoute: ActivatedRoute,
    private oRouter: Router
  ) {}

  ngOnInit(): void {
    let id = this.oActivatedRoute.snapshot.params['id'];
    this.oBalanceService.get(id).subscribe({
      next: (oBalance: IBalance) => {
        this.oBalance = oBalance;
      },
      error: (err) => {
        this.showModal('Error al cargar el usuario');
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
    this.oBalanceService.delete(this.oBalance!.id).subscribe({
      next: (data) => {
        this.showModal(
          'Balance con id ' + this.oBalance!.id + ' ha sido borrado'
        );
      },
      error: (error) => {
        this.showModal('Error al borrar el balance');
      },
    });
  }

  cancel(): void {
    this.oRouter.navigate(['/admin/balance/plist']);
  }

  hideModal = () => {
    this.myModal.hide();
    this.oRouter.navigate(['/admin/balance/plist']);
  };
}
