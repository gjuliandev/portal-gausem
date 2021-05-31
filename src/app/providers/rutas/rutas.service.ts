import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { IRuta } from 'src/app/interfaces/ruta';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RutasService {

  constructor(private http: HttpClient) { }

  getRutas ( ) {
    const url = `${environment.base_url}/rutas`;
    return this.http.get(url)
      .pipe(
        map( (res: any) => res['payload'])
      );
  }

  getRuta ( id: number ) {
    const url = `${environment.base_url}/rutas/${id}`;
    return this.http.get(url)
      .pipe(
        map( (res: any) => res['payload'][0])
      );
  }

  getRutaByParams ( idUsuario: number = 0, fecha: string ) {
    const url = `${environment.base_url}/rutas/${idUsuario}/${fecha}`;
    return this.http.get(url)
      .pipe(
        map( (res: any) => res['payload'][0])
      );
  }

  getDetalleRuta ( id: number ) {
    const url = `${environment.base_url}/rutas/detalle/${id}`;
    return this.http.get(url)
      .pipe(
        map( (res: any) => res['payload'][0])
      );
  }

  crearRuta( ruta: IRuta) {
    console.log('la nueva ruta es ' + JSON.stringify(ruta) );
    const url = `${environment.base_url}/rutas`;
    const newRuta = {
      fecha:               ruta.fecha,
      inicio:              ruta.inicio,
      fin:                 ruta.fin,
      kilometros:          ruta.kilometros,
      duracion:            ruta.duracion,
      usuario_id:          ruta.usuario_id,
      ruta_planificada_id: ruta.ruta_planificada_id
    };
    return this.http.post(url, newRuta);
  }

  actualizarRuta( ruta: IRuta,  ) {
    const url = `${environment.base_url}/rutas/${ruta._id}`;
    const updateRuta = {
      fecha:      ruta.fecha,
      inicio:     ruta.inicio,
      fin:        ruta.fin,
      kilometros: ruta.kilometros,
      duracion:   ruta.duracion,
      usuario_id: ruta.usuario_id,
      _id:        ruta._id
    }
    return this.http.put(url, updateRuta)
  }

  eliminarRuta( ruta: IRuta ) {
    const url = `${environment.base_url}/rutas/${ruta._id}`;
    return this.http.delete(url);
  }
}
