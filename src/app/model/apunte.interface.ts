import { IAsiento } from "./asiento.interface";
import { ISubcuenta } from "./subcuenta.interface";
import { ITipoapunte } from "./tipoapunte.interface";

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
     tipoapunte : ITipoapunte ; 
}