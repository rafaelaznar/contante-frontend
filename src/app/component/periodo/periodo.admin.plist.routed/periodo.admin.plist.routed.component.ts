import { Component, OnInit } from '@angular/core';
import { IPeriodo } from '../../../model/periodo.interface';
import { CommonModule } from '@angular/common';
import { IPage } from '../../../model/model.interface';
import { FormsModule } from '@angular/forms';
import { BotoneraService } from '../../../service/botonera.service';
import { debounceTime, Subject } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { TrimPipe } from '../../../pipe/trim.pipe';
import { PeriodoService } from '../../../service/periodo.service';

@Component({
  standalone: true,
  selector: 'app-periodo.admin.plist.routed',
  templateUrl: './periodo.admin.plist.routed.component.html',
  styleUrls: ['./periodo.admin.plist.routed.component.css'],
  imports: [CommonModule, FormsModule, TrimPipe, RouterModule],
})
export class  PeriodoAdminPlistRoutedComponent implements OnInit {

  oPage: IPage<IPeriodo> | null = null;
  //
  nPage: number = 0; // 0-based server count
  nRpp: number = 10;
  //
  strField: string = '';
  strDir: string = '';
  //
  strFiltro: string = '';
  //
  arrBotonera: string[] = [];
  //
  private debounceSubject = new Subject<string>();

  constructor(
    private oPeriodoService: PeriodoService,
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
    this.oPeriodoService
      .getPage(this.nPage, this.nRpp, this.strField, this.strDir, this.strFiltro)
      .subscribe({
        next: (oPageFromServer: IPage<IPeriodo>) => {
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

  edit(oPeriodo: IPeriodo) {
    //navegar a la página de edición
    this.oRouter.navigate(['admin/periodo/edit', oPeriodo.id]);
  }

  view(oPeriodo: IPeriodo) {
    //navegar a la página de edición
    this.oRouter.navigate(['admin/periodo/view', oPeriodo.id]);
  }

  remove(oPeriodo: IPeriodo) {
    this.oRouter.navigate(['admin/periodo/delete/', oPeriodo.id]);
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
