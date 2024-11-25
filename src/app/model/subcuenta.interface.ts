import { ICuenta } from "./cuenta.interface";

export interface ISubcuenta{
    id : number;
    codigo : number;
    descripcion : string;
    cuenta : ICuenta;
    momentstamp : Date;
    apuntes: number;
    gruposubcuentas: number;
}
