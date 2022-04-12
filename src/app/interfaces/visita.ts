

export interface IVisita {
  alias?:         string;
  fecha:          string;
  lat?:           number;
  lng?:           number;
  tipo?:          string;
  bidones?:       number;
  kilos?:         number;
  entregado?:     number;
  nAlbaran?:      number;
  cliente_id:     number;
  ruta_id:        number;
  notas?:         string;
  observaciones?: string;
  orden?:         number;
  isVisited?:     boolean;
  _id?:           number;
} 
