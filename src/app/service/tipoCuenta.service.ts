import { Injectable } from '@angular/core';
import { httpOptions, serverURL } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { ITipoCuenta } from '../model/tipoCuenta.interface';
import { IPage } from '../model/model.interface';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class TipoCuentaService {

serverURL: string = serverURL + '/tipoCuenta';

  constructor(private oHttp: HttpClient) {}

  getPage(
    page: number,
    size: number,
    field: string,
    dir: string,
    filtro: string
  ): Observable<IPage<ITipoCuenta>> {
    let URL: string = '';
    URL += this.serverURL;
    if (!page) {
      page = 0;
    }
    URL += '?page=' + page;
    if (!size) {
      size = 10;
    }
    URL += '&size=' + size;
    if (field) {
      URL += '&sort=' + field;
      if (dir === 'asc') {
        URL += ',asc';
      } else {
        URL += ',desc';
      }
    }
    if (filtro) {
      URL += '&filter=' + filtro;
    }
    return this.oHttp.get<IPage<ITipoCuenta>>(URL, httpOptions);
  }

  get(id: number): Observable<ITipoCuenta> {
    let URL: string = '';
    URL += this.serverURL;
    URL += '/' + id;
    return this.oHttp.get<ITipoCuenta>(URL);
  }

  create(oTipoCuenta: ITipoCuenta): Observable<ITipoCuenta> {
    let URL: string = '';
    URL += this.serverURL;
    return this.oHttp.put<ITipoCuenta>(URL, oTipoCuenta);
  }

  update(oTipoCuenta: ITipoCuenta): Observable<ITipoCuenta> {
    let URL: string = '';
    URL += this.serverURL;
    return this.oHttp.put<ITipoCuenta>(URL, oTipoCuenta);
  }

  getOne(id: number): Observable<ITipoCuenta> {
    let URL: string = '';
    URL += 'http://localhost:8085';
    URL += '/tipoCuenta';
    URL += '/' + id;
    return this.oHttp.get<ITipoCuenta>(URL);
  }

  delete(id: number) {
    return this.oHttp.delete('http://localhost:8085/tipoCuenta/' + id);
  }
}
