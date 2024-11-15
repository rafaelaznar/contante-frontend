import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { IPage } from '../model/model.interface';
import { httpOptions, serverURL } from '../environment/environment';
import { ITipoAsiento } from '../model/tipoAsiento.interface';

@Injectable({
  providedIn: 'root',
})
export class TipoAsientoService {
  serverURL: string = serverURL + '/tipoasiento';

  constructor(private oHttp: HttpClient) {}

  getPage(
    page: number,
    size: number,
    field: string,
    dir: string,
    filtro: string
  ): Observable<IPage<ITipoAsiento>> {
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
    return this.oHttp.get<IPage<ITipoAsiento>>(URL, httpOptions);
  }

  get(id: number): Observable<ITipoAsiento> {
    let URL: string = '';
    URL += this.serverURL;
    URL += '/' + id;
    return this.oHttp.get<ITipoAsiento>(URL);
  }

  create(oTipoAsiento: ITipoAsiento): Observable<ITipoAsiento> {
    let URL: string = '';
    URL += this.serverURL;
    return this.oHttp.put<ITipoAsiento>(URL, oTipoAsiento);
  }

  update(oTipoAsiento: ITipoAsiento): Observable<ITipoAsiento> {
    let URL: string = '';
    URL += this.serverURL;
    return this.oHttp.put<ITipoAsiento>(URL, oTipoAsiento);
  }

  getOne(id: number): Observable<ITipoAsiento> {
    let URL: string = '';
    URL += 'http://localhost:8085';
    URL += '/tipoasiento';
    URL += '/' + id;
    return this.oHttp.get<ITipoAsiento>(URL);
  }

  delete(id: number) {
    return this.oHttp.delete('http://localhost:8085/tipoasiento/' + id);
  }
}
