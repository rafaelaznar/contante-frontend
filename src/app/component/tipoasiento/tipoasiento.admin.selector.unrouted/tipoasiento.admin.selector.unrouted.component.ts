import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IPage } from '../../../model/model.interface';
import { FormsModule } from '@angular/forms';
import { BotoneraService } from '../../../service/botonera.service';
import { debounceTime, Subject } from 'rxjs';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TrimPipe } from '../../../pipe/trim.pipe';
import { ITipoasiento } from '../../../model/tipoasiento.interface';
import { TipoAsientoService } from '../../../service/tipoAsiento.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-tipoasiento-admin-selector-unrouted',
  templateUrl: './tipoasiento.admin.selector.unrouted.component.html',
  styleUrls: ['./tipoasiento.admin.selector.unrouted.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, TrimPipe, RouterModule],
})
export class TipoasientoAdminSelectorUnroutedComponent implements OnInit {
  oPage: IPage<ITipoasiento> | null = null;
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
  readonly dialogRef = inject(
    MatDialogRef<TipoasientoAdminSelectorUnroutedComponent>
  );
  readonly data = inject(MAT_DIALOG_DATA);

  constructor(
    private oTipoAsientoService: TipoAsientoService,
    private oBotoneraService: BotoneraService,
    private oRouter: Router,
    private oActivatedRoute: ActivatedRoute
  ) {
    this.debounceSubject.pipe(debounceTime(10)).subscribe((value) => {
      this.getPage();
      console.log(this.oActivatedRoute.snapshot.params['id'] as number);
    });
  }

  ngOnInit() {
    this.getPage();
  }

  getPage() {
    if (this.data.origen == 'xbalance') {
      this.oTipoAsientoService
        .getPageWhereIdIsNot(
          this.nPage,
          this.nRpp,
          this.strField,
          this.strDir,
          this.strFiltro,
          this.data.idBalance
        )
        .subscribe({
          next: (oPageFromServer: IPage<ITipoasiento>) => {
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
    } else {
      this.oTipoAsientoService
        .getPage(
          this.nPage,
          this.nRpp,
          this.strField,
          this.strDir,
          this.strFiltro
        )
        .subscribe({
          next: (oPageFromServer: IPage<ITipoasiento>) => {
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
  }

  select(oTipoAsiento: ITipoasiento) {
    // estamos en ventana emergente: no navegar
    // emitir el objeto seleccionado

    this.dialogRef.close(oTipoAsiento);
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
