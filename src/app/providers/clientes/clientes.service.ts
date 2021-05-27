import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ICliente } from 'src/app/interfaces/cliente';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private http: HttpClient) { }

  getCliente ( id: number ) {
    const url = `${environment.base_url}/clientes/${id}`;
    return this.http.get(url)
      .pipe(
        map( (res: any) => res['payload'][0])
      );
  }

  getClientes() {
    const url = `${environment.base_url}/clientes`;
    return this.http.get(url)
      .pipe(
        map( (res: any) => res['payload'])
      );
  }

  crearCliente( cliente: ICliente) {
    console.log('el nuevo cliente es ' + JSON.stringify(cliente) );
    const url = `${environment.base_url}/clientes`;
    const newClient = {
      nombreComercial:        cliente.nombreComercial,
      nombreFiscal:           cliente.nombreFiscal,
      siglas:                 cliente.siglas,
      cif:                    cliente.cif,
      abonado:                cliente.abonado,
      IBAN:                   cliente.IBAN,
      notas:                  cliente.notas,
      cantidad_abonada:       cliente.cantidad_abonada,
      periodicidad:           cliente.periodicidad,
      consumo:                cliente.consumo,
      fecha_alta:             cliente.fecha_alta,
      renovacion_certificado: cliente.renovacion_certificado

    };
    return this.http.post(url, newClient);

  }

  updateCliente( cliente: ICliente ) {
    const url = `${environment.base_url}/clientes/${cliente._id}`;
    const updateClient = {
      nombreComercial:        cliente.nombreComercial,
      nombreFiscal:           cliente.nombreFiscal,
      siglas:                 cliente.siglas,
      cif:                    cliente.cif,
      abonado:                cliente.abonado,
      IBAN:                   cliente.IBAN,
      notas:                  cliente.notas,
      cantidad_abonada:       cliente.cantidad_abonada,
      periodicidad:           cliente.periodicidad,
      consumo:                cliente.consumo,
      fecha_alta:             cliente.fecha_alta,
      renovacion_certificado: cliente.renovacion_certificado
    }
    return this.http.put(url, updateClient);
  }

  deleteCliente( cliente: ICliente ){
    const url = `${environment.base_url}/clientes/${cliente._id}`;
    return this.http.delete(url);
  }

}
