import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TrimPipe } from '../../../pipe/trim.pipe';
import { IBalance } from '../../../model/balance.interface';
import { Subject, debounceTime } from 'rxjs';
import { IPage } from '../../../model/model.interface';
import { BotoneraService } from '../../../service/botonera.service';
import { BalanceService } from '../../../service/balance.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ITipoasiento } from '../../../model/tipoasiento.interface';
import { TipoAsientoService } from '../../../service/tipoAsiento.service';

@Component({
  selector: 'app-balance-xtipoasiento-admin-plist-routed',
  templateUrl: './balance.xtipoasiento.admin.plist.routed.component.html',
  styleUrls: ['./balance.xtipoasiento.admin.plist.routed.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, TrimPipe, RouterModule],
})

export class BalanceXTipoasientoAdminPlistRoutedComponent implements OnInit {
  oPage: IPage<IBalance> | null = null;
  //
  nPage: number = 0; // 0-based server count
  nRpp: number = 10;
  //
  strField: string = '';
  strDir: string = 'desc';
  //
  strFiltro: string = '';
  //
  arrBotonera: string[] = [];
  //
  private debounceSubject = new Subject<string>();
  //
  oTipoasiento: ITipoasiento = {} as ITipoasiento;
  //
  id_tipoasiento: number = 0;

  constructor(
    private oBalanceService: BalanceService,
    private oBotoneraService: BotoneraService,
    private oRouter: Router,
    private oActivatedRoute: ActivatedRoute,
    private oTipoAsientoService: TipoAsientoService
  ) {
    this.debounceSubject.pipe(debounceTime(500)).subscribe((value) => {
      this.getPage();
    });

    // recollir el paràmetre de la URL tipoapunte
    this.id_tipoasiento = this.oActivatedRoute.snapshot.params['id'];
    this.oTipoAsientoService.get(this.id_tipoasiento).subscribe({
      next: (oTipoasiento: ITipoasiento) => {
        this.oTipoasiento = oTipoasiento;
        this.getPage();
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });

  }

  ngOnInit() {
    this.getPage();
  }

  getPage() {
    this.oBalanceService
      .getPageXTipoasiento(this.nPage, this.nRpp, this.strField, this.strDir, this.strFiltro, this.id_tipoasiento)
      .subscribe({
        next: (oPageFromServer: IPage<IBalance>) => {
          this.oPage = oPageFromServer;
          this.arrBotonera = this.oBotoneraService.getBotonera(
            this.nPage,
            oPageFromServer.totalPages
          );
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  edit(oBalance: IBalance) {
    //navegar a la página de edición
    this.oRouter.navigate(['admin/balance/edit', oBalance.id]);
  }

  view(oBalance: IBalance) {
    //navegar a la página de edición
    this.oRouter.navigate(['admin/balance/view', oBalance.id]);
  }

  remove(oBalance: IBalance) {
    this.oRouter.navigate(['admin/balance/delete/', oBalance.id]);
  }

  goToPage(p: number) {
    if (p) {
      this.nPage = p - 1;
      this.getPage();
    }
    return false;
  }

  goToNext() {
    this.nPage++;
    this.getPage();
    return false;
  }

  goToPrev() {
    this.nPage--;
    this.getPage();
    return false;
  }

  sort(field: string) {
    this.strField = field;
    this.strDir = this.strDir === 'asc' ? 'desc' : 'asc';
    this.getPage();
  }

  goToRpp(nrpp: number) {
    this.nPage = 0;
    this.nRpp = nrpp;
    this.getPage();
    return false;
  }

  filter(event: KeyboardEvent) {
    this.debounceSubject.next(this.strFiltro);
  }
}
