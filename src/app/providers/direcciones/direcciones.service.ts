import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IDireccion } from 'src/app/interfaces/direccion';

@Injectable({
  providedIn: 'root'
})
export class DireccionesService {

  constructor(private http: HttpClient) { }

  getDireccion ( id: number ) {
    const url = `${environment.base_url}/direcciones/${id}`;
    return this.http.get(url)
      .pipe(
        map( (res: any) => res['payload'][0])
      );
  }

  crearDireccion( direccion: IDireccion) {
    console.log('la nueva direccion es ' + JSON.stringify(direccion) );
    const url = `${environment.base_url}/direcciones`;
    const newDireccion = {
      domicilio:  direccion.domicilio,
      poblacion:  direccion.poblacion,
      provincia:  direccion.provincia,
      codPostal:  direccion.codPostal,
      cliente_id: direccion.cliente_id
    };
    return this.http.post(url, newDireccion);
  }

  actualizarDireccion( direccion: IDireccion,  ) {
    const url = `${environment.base_url}/direcciones/${direccion._id}`;
    const updateDireccion = {
      domicilio: direccion.domicilio,
      poblacion: direccion.poblacion,
      provincia: direccion.provincia,
      codPostal: direccion.codPostal,
      _id:       direccion._id
    }
    return this.http.put(url, updateDireccion)
  }

  eliminarDireccion( direccion: IDireccion ) {
    const url = `${environment.base_url}/direcciones/${direccion._id}`;
    return this.http.delete(url);
  }

}
