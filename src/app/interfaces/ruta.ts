import { IVisita } from "./visita";


export interface IRuta {
  fecha:                string;
  inicio?:              string;
  fin?:                 string;
  kilometros?:          number;
  duracion?:            number;
  usuario_id?:          number;
  _id?:                 number;
  visitas?:             Array<IVisita>
  ruta_planificada_id?: number
}
