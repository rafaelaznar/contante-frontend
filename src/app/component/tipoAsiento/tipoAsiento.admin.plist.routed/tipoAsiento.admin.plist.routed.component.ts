import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IPage } from '../../../model/model.interface';
import { FormsModule } from '@angular/forms';
import { BotoneraService } from '../../../service/botonera.service';
import { debounceTime, Subject } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { TrimPipe } from '../../../pipe/trim.pipe';
import { ITipoasiento } from '../../../model/tipoasiento.interface';
import { TipoAsientoService } from '../../../service/tipoAsiento.service';

@Component({
  selector: 'app-tipoAsiento.admin.plist.routed',
  templateUrl: './tipoAsiento.admin.plist.routed.component.html',
  styleUrls: ['./tipoAsiento.admin.plist.routed.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, TrimPipe, RouterModule],
})
export class TipoAsientoAdminPlistRoutedComponent implements OnInit {

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
  constructor(
    private oTipoAsientoService: TipoAsientoService,
    private oBotoneraService: BotoneraService,
    private oRouter: Router
  ) {
    this.debounceSubject.pipe(debounceTime(10)).subscribe((value) => {
      this.nPage = 0;
      this.getPage();

    });
   }

  ngOnInit() {
    this.getPage();
  }
  
  getPage() {
    this.oTipoAsientoService
      .getPage(this.nPage, this.nRpp, this.strField, this.strDir, this.strFiltro)
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

  edit(oTipoAsiento: ITipoasiento) {
    //navegar a la página de edición
    this.oRouter.navigate(['admin/tipoAsiento/edit', oTipoAsiento.id]);
  }

  view(oTipoAsiento: ITipoasiento) {
    //navegar a la página de edición
    this.oRouter.navigate(['admin/tipoAsiento/view', oTipoAsiento.id]);
  }

  remove(oTipoAsiento: ITipoasiento) {
    this.oRouter.navigate(['admin/tipoAsiento/delete/', oTipoAsiento.id]);
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
