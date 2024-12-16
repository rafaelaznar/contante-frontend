import { IBalance } from "./balance.interface"
import { ICuenta } from './cuenta.interface';

export interface IGrupocuenta {
    id: number 
    titulo: string
    descripcion: string
    orden: number
    cuenta: ICuenta
    balance: IBalance
  }