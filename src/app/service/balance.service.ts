import { Injectable } from '@angular/core';
import { httpOptions, serverURL } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPage } from '../model/model.interface';
import { IBalance } from '../model/balance.interface';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {
  serverURL: string = serverURL + '/balance';

  constructor(private oHttp: HttpClient) {}

  getPage(
    page: number,
    size: number,
    field: string,
    dir: string,
    filtro: string
  ): Observable<IPage<IBalance>> {
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
    return this.oHttp.get<IPage<IBalance>>(URL, httpOptions);
  }

  get(id: number): Observable<IBalance> {
    let URL: string = '';
    URL += this.serverURL;
    URL += '/' + id;
    return this.oHttp.get<IBalance>(URL);
  }

  create(oBalance: IBalance): Observable<IBalance> {
    let URL: string = '';
    URL += this.serverURL;
    return this.oHttp.put<IBalance>(URL, oBalance);
  }

  update(oBalance: IBalance): Observable<IBalance> {
    let URL: string = '';
    URL += this.serverURL;
    return this.oHttp.put<IBalance>(URL, oBalance);
  }

  getOne(id: number): Observable<IBalance> {
    let URL: string = '';
    URL += 'http://localhost:8085';
    URL += '/balance';
    URL += '/' + id;
    return this.oHttp.get<IBalance>(URL);
  }

  delete(id: number) {
    return this.oHttp.delete('http://localhost:8085/balance/' + id);
  }
}