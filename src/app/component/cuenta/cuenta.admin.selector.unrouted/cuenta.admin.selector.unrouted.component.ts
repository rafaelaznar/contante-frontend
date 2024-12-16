import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TrimPipe } from '../../../pipe/trim.pipe';
import { Router, RouterModule } from '@angular/router';
import { ICuenta } from '../../../model/cuenta.interface';
import { IPage } from '../../../model/model.interface';
import { debounceTime, Subject } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CuentaService } from '../../../service/cuenta.service';
import { BotoneraService } from '../../../service/botonera.service';

@Component({
  selector: 'app-cuenta.admin.selector.unrouted',
  templateUrl: './cuenta.admin.selector.unrouted.component.html',
  styleUrls: ['./cuenta.admin.selector.unrouted.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, TrimPipe, RouterModule],
})
export class CuentaAdminSelectorUnroutedComponent implements OnInit {

  oPage: IPage<ICuenta> | null = null;
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
  readonly dialogRef = inject(MatDialogRef<CuentaAdminSelectorUnroutedComponent>);
  readonly data = inject(MAT_DIALOG_DATA);

  constructor(
    private oCuentaService: CuentaService,
    private oBotoneraService: BotoneraService,
    private oRouter: Router
  ) {
    this.debounceSubject.pipe(debounceTime(10)).subscribe((value) => {
      this.getPage();
    });
  }

  ngOnInit() {
    this.getPage();
  }

  getPage() {
    
    this.oCuentaService
      .getPageXBalanceNoTiene(
        this.nPage,
        this.nRpp,
        this.data.idBalance
      )
      .subscribe({
        next: (oPageFromServer: IPage<ICuenta>) => {
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

 

  select(oCuenta: ICuenta) {
    
      // estamos en ventana emergente: no navegar
      // emitir el objeto seleccionado

      this.dialogRef.close(oCuenta);


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
