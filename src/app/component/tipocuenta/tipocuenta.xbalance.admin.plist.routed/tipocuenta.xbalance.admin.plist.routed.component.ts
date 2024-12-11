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

@Component({
  selector: 'app-tipocuenta-admin-routed',
  templateUrl: './tipocuenta.xbalance.admin.plist.routed.component.html',
  styleUrls: ['./tipocuenta.xbalance.admin.plist.routed.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, TrimPipe, RouterModule],
})

export class TipocuentaAdminPlistRoutedComponent implements OnInit {
  oPage: IPage<ITipocuenta> | null = null;
  //
  nPage: number = 0; // 0-based server count
  nRpp: number = 10;

  //
  arrBotonera: string[] = [];
  //
  idBalance: number = 0;

  constructor(
    private oTipoCuentaService: TipoCuentaService,
    private oBotoneraService: BotoneraService,
    private oRouter: Router,
    private oActivatedRoute: ActivatedRoute,

  ) {

  }

  ngOnInit() {

    this.oActivatedRoute.params.subscribe((params) => {
      this.idBalance = params['id'];

      this.getPage();

    });
  }

  getPage() {
    

      this.oTipoCuentaService.getPageXBalance(this.nPage,
        this.nRpp,
        this.idBalance).subscribe({
          next: (oPage: IPage<ITipocuenta>) => {
            this.oPage = oPage;
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


}
