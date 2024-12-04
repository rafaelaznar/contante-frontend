import { ITipocuenta } from './tipocuenta.interface';

export interface ICuenta {
  id: number;
  codigo: string;
  descripcion: string;
  tipocuenta: ITipocuenta;
  subcuentas?: number;
  grupocuentas?: number;
}
