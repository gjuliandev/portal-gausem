export interface ICliente {
  nombreComercial?:        string;
  nombreFiscal?:           string;
  siglas?:                 string;
  cif?:                    string;
  abonado?:                string;
  IBAN?:                   string;
  notas?:                  string;
  cantidad_abonada?:       number,
  periodicidad?:           number,
  consumo?:                number,
  fecha_alta?:             Date;
  renovacion_certificado?: Date;
  _id?:                   string;
  logo?:                  string;
}
