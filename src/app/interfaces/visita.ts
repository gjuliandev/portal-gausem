

export interface IVisita {
  alias:      string;
  fecha:      Date;
  lat:        number;
  lng:        number;
  tipo:       string;
  bidones?:   number;
  kilos?:     number;
  entregado?: number;
  nAlbaran?:  number;
  cliente_id: number;
  ruta_id:    number;
  notas?:     string;
  orden?:     number;
  _id?:       number;
}
