import { Component, OnInit } from '@angular/core';
import { AsientoService } from '../../../service/asiento.service';
import { IAsiento } from '../../../model/asiento.interface';
import { CommonModule } from '@angular/common';
import { IPage } from '../../../model/model.interface';
import { FormsModule } from '@angular/forms';
import { BotoneraService } from '../../../service/botonera.service';
import { debounceTime, Subject } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { TrimPipe } from '../../../pipe/trim.pipe';

@Component({
  selector: 'app-asiento.admin.routed',
  templateUrl: './asiento.admin.plist.routed.component.html',
  styleUrls: ['./asiento.admin.plist.routed.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, TrimPipe, RouterModule],
})
export class AsientoAdminPlistRoutedComponent implements OnInit {
  
  oPage: IPage<IAsiento> | null = null;
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
    private oAsientoService: AsientoService,
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
     this.oAsientoService
       .getPage(this.nPage, this.nRpp, this.strField, this.strDir, this.strFiltro)
       .subscribe({
         next: (oPageFromServer: IPage<IAsiento>) => {
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

  edit(oAsiento: IAsiento) {
    //navegar a la página de edición
    this.oRouter.navigate(['admin/asiento/edit', oAsiento.id]);
  }

  view(oAsiento: IAsiento) {
    //navegar a la página de edición
    this.oRouter.navigate(['admin/asiento/view', oAsiento.id]);
  }

  remove(oAsiento: IAsiento) {
    this.oRouter.navigate(['admin/asiento/delete/', oAsiento.id]);
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
