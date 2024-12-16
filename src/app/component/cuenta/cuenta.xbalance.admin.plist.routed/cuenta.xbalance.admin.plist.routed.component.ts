import { Component, inject, OnInit } from '@angular/core';
import { ICuenta } from '../../../model/cuenta.interface';
import { IPage } from '../../../model/model.interface';
import { IBalance } from '../../../model/balance.interface';
import { IGrupocuenta } from '../../../model/grupocuenta.interface';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TrimPipe } from '../../../pipe/trim.pipe';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CuentaService } from '../../../service/cuenta.service';
import { BalanceService } from '../../../service/balance.service';
import { BotoneraService } from '../../../service/botonera.service';
import { GrupoCuentaService } from '../../../service/grupocuenta.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CuentaAdminSelectorUnroutedComponent } from '../cuenta.admin.selector.unrouted/cuenta.admin.selector.unrouted.component';

@Component({
  selector: 'app-cuenta-admin-routed',
  templateUrl: './cuenta.xbalance.admin.plist.routed.component.html',
  styleUrls: ['./cuenta.xbalance.admin.plist.routed.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, TrimPipe, RouterModule],
})
export class CuentaXBalanceAdminPlistRoutedComponent implements OnInit {

  oPage: IPage<ICuenta> | null = null;
  //
  nPage: number = 0; // 0-based server count
  nRpp: number = 10;
  //
  arrBotonera: string[] = [];
  //
  oBalance: IBalance = {} as IBalance;
  //
  oCuenta: ICuenta = {} as ICuenta;
  //
  oGrupocuenta: IGrupocuenta = {} as IGrupocuenta;
  //
  readonly dialog = inject(MatDialog);

  constructor(
    private oCuentaService: CuentaService,
    private oBalanceService: BalanceService,
    private oBotoneraService: BotoneraService,
    private oRouter: Router,
    private oActivatedRoute: ActivatedRoute,
    private oGrupoCuentaService: GrupoCuentaService
  ) {}

  ngOnInit() {
    this.oActivatedRoute.params.subscribe((params) => {
      this.oBalanceService.get(params['id']).subscribe({
        next: (oBalance: IBalance) => {
          this.oBalance = oBalance;
          this.getPage();
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        },
      });
    });
  }

  getPage() {
    this.oCuentaService
      .getPageXBalance(this.nPage, this.nRpp, this.oBalance.id)
      .subscribe({
        next: (oPage: IPage<ICuenta>) => {
          this.oPage = oPage;
          this.arrBotonera = this.oBotoneraService.getBotonera(
            this.nPage,
            oPage.totalPages
          );
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        },
      });
  }

  goToPage(p: number) {
    if (p) {
      this.nPage = p - 1;
      this.getPage();
    }
    return false;
    /**
     * This subscribe is used to get a page of IApunte objects from the server
     * based on the current page number and the number of records per page.
     * The page objects are stored in the oPage property and the button set
     * is updated with the number of pages.
     */
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

  delete(cuenta: ICuenta) {
    this.oGrupoCuentaService
      .delete(this.oBalance.id, cuenta.id)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.getPage();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  showCuentaSelectorModal() {
    const dialogRef = this.dialog.open(
      CuentaAdminSelectorUnroutedComponent,
      {
        height: '800px',
        maxHeight: '1200px',
        width: '80%',
        maxWidth: '90%',
        data: { idBalance: this.oBalance.id },
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        console.log(result);
        this.oCuenta = result;
        this.oGrupocuenta = {
          id: null as unknown as number,
          titulo: "aaa",
          descripcion: "aaa",
          orden: 0,
          cuenta: this.oCuenta,
          balance: this.oBalance
        };
        this.oGrupoCuentaService.create(this.oGrupocuenta).subscribe({
          next: (data) => {
            console.log(data);
            this.getPage();
          },
          error: (error) => {
            console.log(error);
          },
        });
      }
    });
    return false;
  }

}
