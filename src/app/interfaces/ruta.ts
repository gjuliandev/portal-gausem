import { IVisita } from "./visita";


export interface IRuta {
  fecha:        string;
  inicio?:      string;
  fin?:         string;
  kilometros?:  number;
  duracion?:    number;
  usuario_id?:  number;
  estado:       number; //0-PLANIFICADA; 1-REALIZADA; 2-EN PROGRESO; 3-CANCELADA; 4-REVISADA
  lote?:         number;
  observaciones? :string;
  _id?:         number;
  visitas:      Array<IVisita>
}
