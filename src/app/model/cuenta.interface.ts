import { ITipoCuenta } from './tipoCuenta.interface';

export interface ICuenta {
  id: number;
  codigo: string;
  descripcion: string;
  tipocuenta: ITipoCuenta;
}
