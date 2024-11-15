import { Injectable } from '@angular/core';
import { httpOptions, serverURL } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { ITipoApunte } from '../model/tipoapunte.interface';
import { IPage } from '../model/model.interface';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class TipoApunteService {

  serverURL: string = serverURL + '/tipoapunte';

constructor(private oHttp: HttpClient) { }

getPage(
  page: number,
  size: number,
  field: string,
  dir: string,
  filtro: string
): Observable<IPage<ITipoApunte>> {
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
  return this.oHttp.get<IPage<ITipoApunte>>(URL, httpOptions);
}

get(id: number): Observable<ITipoApunte> {
  let URL: string = '';
  URL += this.serverURL;
  URL += '/' + id;
  return this.oHttp.get<ITipoApunte>(URL);
}

create(oTipoApunte: ITipoApunte): Observable<ITipoApunte> {
  let URL: string = '';
  URL += this.serverURL;
  return this.oHttp.put<ITipoApunte>(URL, oTipoApunte);
}

update(oTipoApunte: ITipoApunte): Observable<ITipoApunte> {
  let URL: string = '';
  URL += this.serverURL;
  return this.oHttp.put<ITipoApunte>(URL, oTipoApunte);
}

getOne(id: number): Observable<ITipoApunte> {
  let URL: string = '';
  URL += 'http://localhost:8085';
  URL += '/tipoapunte';
  URL += '/' + id;
  return this.oHttp.get<ITipoApunte>(URL);
}

delete(id: number) {
  return this.oHttp.delete('http://localhost:8085/tipoapunte/' + id);
}
}
