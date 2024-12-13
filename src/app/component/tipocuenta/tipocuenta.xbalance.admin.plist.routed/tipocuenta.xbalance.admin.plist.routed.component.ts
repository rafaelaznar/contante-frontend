import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IPage } from '../../../model/model.interface';
import { FormsModule } from '@angular/forms';
import { BotoneraService } from '../../../service/botonera.service';
import { debounceTime, Subject } from 'rxjs';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TrimPipe } from '../../../pipe/trim.pipe';
import { ITipocuenta } from '../../../model/tipocuenta.interface';
import { TipoCuentaService } from '../../../service/tipoCuenta.service';
import { HttpErrorResponse } from '@angular/common/http';
import { BalanceService } from '../../../service/balance.service';
import { IBalance } from '../../../model/balance.interface';
import { GrupoTipoCuentaService } from '../../../service/grupotipocuenta.service';

@Component({
  selector: 'app-tipocuenta-admin-routed',
  templateUrl: './tipocuenta.xbalance.admin.plist.routed.component.html',
  styleUrls: ['./tipocuenta.xbalance.admin.plist.routed.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, TrimPipe, RouterModule],
})

export class TipocuentaXBalanceAdminPlistRoutedComponent implements OnInit {
  oPage: IPage<ITipocuenta> | null = null;
  //
  nPage: number = 0; // 0-based server count
  nRpp: number = 10;
  //
  arrBotonera: string[] = [];
  //
  oBalance: IBalance = {} as IBalance;
  //

  constructor(
    private oTipoCuentaService: TipoCuentaService,
    private oBalanceService: BalanceService,
    private oBotoneraService: BotoneraService,
    private oRouter: Router,
    private oActivatedRoute: ActivatedRoute,
    private oGrupoTipoCuentaService: GrupoTipoCuentaService,

  ) {

  }

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
        
      })



    });
  }

  getPage() {
    

      this.oTipoCuentaService.getPageXBalance(this.nPage,
        this.nRpp,
        this.oBalance.id).subscribe({
          next: (oPage: IPage<ITipocuenta>) => {
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


  delete(tipoCuenta: ITipocuenta) {
    this.oGrupoTipoCuentaService.delete(this.oBalance.id,tipoCuenta.id).subscribe({
      next: (data) => {
        console.log(data);
        this.getPage();
      },
      error: (error) => {
        console.log(error);
      },
    })
  }


}
