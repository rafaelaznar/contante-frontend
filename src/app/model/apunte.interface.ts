import { IAsiento } from "./asiento.interface";
import { ISubcuenta } from "./subcuenta.interface";
import { ITipoApunte } from "./tipoapunte.interface";

export interface IApunte {
     id : number ;
     debe : number ;
     haber : number;
     descripcion : string;
     comentarios : string; 
     momentstamp:   Date;
     orden:  number ;
     asiento : IAsiento ;
     subcuenta : ISubcuenta ;
     tipoApunte : ITipoApunte ; 
}