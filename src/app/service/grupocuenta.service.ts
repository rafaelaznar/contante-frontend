import { Injectable } from "@angular/core";
import { httpOptions, serverURL } from '../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { IGrupocuenta } from "../model/grupocuenta.interface";

@Injectable({
    providedIn: 'root',
  })
  export class GrupoCuentaService {
    serverURL: string = serverURL + '/grupocuenta';
  
    constructor(private oHttp: HttpClient) {}
  
    delete(idb: number, idtc: number): Observable<number> {
      let URL: string = '';
      URL += this.serverURL;
      URL += '/delete/' + idb + '/' + idtc;
      return this.oHttp.delete<number>(URL);
    }
  
    create(oGrupoCuenta: IGrupocuenta): Observable<IGrupocuenta> {
      //hack para evitar error de tipo en el servidor
      //tipocuenta
      oGrupoCuenta.cuenta.subcuentas = [];
      oGrupoCuenta.cuenta.grupocuentas = [];
      //balance
      oGrupoCuenta.balance.grupotipoasientos = [];
      oGrupoCuenta.balance.gruposubcuentas = [];
      oGrupoCuenta.balance.grupocuentas = [];
      oGrupoCuenta.balance.grupocuentas = [];
      oGrupoCuenta.balance.grupotipoapuntes = [];
      //----
      let URL: string = '';
      URL += this.serverURL;
      URL += '/create/' + oGrupoCuenta.balance.id + '/' + oGrupoCuenta.cuenta.id;
      return this.oHttp.put<IGrupocuenta>(URL, oGrupoCuenta);
    }
  }