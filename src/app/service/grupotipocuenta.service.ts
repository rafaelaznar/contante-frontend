import { Injectable } from "@angular/core";
import { httpOptions, serverURL } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/internal/Observable";


@Injectable({
    providedIn: 'root',
  })
  export class GrupoTipoCuentaService {
    serverURL: string = serverURL + '/grupoTipoCuenta';

    constructor(private oHttp: HttpClient) { }


    delete(idb: number, idtc: number): Observable<number> {
        let URL: string = '';
        URL += this.serverURL;
        URL += '/delete/' + idb + '/' + idtc;
        return  this.oHttp.delete<number>(URL);
      }

  }