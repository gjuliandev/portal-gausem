import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { IVisita } from 'src/app/interfaces/visita';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VisitasService {

  constructor(private http: HttpClient) { }

  getVisitas ( ) {
    const url = `${environment.base_url}/visitas`;
    return this.http.get(url)
      .pipe(
        map( (res: any) => res['payload'])
      );
  }

  getVisitasByRuta ( id: number = 0 ) {
    const url = `${environment.base_url}/visitas/ruta/${id}`;
    return this.http.get(url)
      .pipe(
        map( (res: any) => res['payload'])
      );
  }

  getVisitasByCliente ( id: number = 0 ) {
    const url = `${environment.base_url}/visitas/cliente/${id}`;
    return this.http.get(url)
      .pipe(
        map( (res: any) => res['payload'])
      );
  }

  getVisita ( id: number ) {
    const url = `${environment.base_url}/visitas/${id}`;
    return this.http.get(url)
      .pipe(
        map( (res: any) => res['payload'][0])
      );
  }

  crearVisita( visita: IVisita) {
    const url = `${environment.base_url}/visitas`;
    const newVisita = {
      alias:      visita.alias,
      fecha:      visita.fecha,
      lat:        visita.lat,
      lng:        visita.lng,
      tipo:       visita.tipo,
      bidones:    visita.bidones,
      kilos:      visita.kilos,
      entregado:  visita.entregado,
      nAlbaran:   visita.nAlbaran,
      cliente_id: visita.cliente_id,
      ruta_id:    visita.ruta_id,
      notas:      visita.notas,
      isVisited:  visita.isVisited,
      orden:      visita.orden
    };
    return this.http.post(url, newVisita);
  }

  actualizarVisita( visita: IVisita,  ) {
    const url = `${environment.base_url}/visitas/${visita._id}`;
    const updateVisita = {
      alias:      visita.alias,
      fecha:      visita.fecha,
      lat:        visita.lat,
      lng:        visita.lng,
      tipo:       visita.tipo,
      bidones:    visita.bidones,
      kilos:      visita.kilos,
      entregado:  visita.entregado,
      nAlbaran:   visita.nAlbaran,
      cliente_id: visita.cliente_id,
      ruta_id:    visita.ruta_id,
      notas:      visita.notas,
      orden:      visita.orden,
      isVisited:  visita.isVisited,
      _id:        visita._id
    }
    return this.http.put(url, updateVisita)
  }

  eliminarVisita( visita: IVisita ) {
    const url = `${environment.base_url}/visitas/${visita._id}`;
    return this.http.delete(url);
  }

  eliminarVisitasRuta( idRuta: number = 0 ) {
    const url = `${environment.base_url}/visitas/ruta/${idRuta}`;
    return this.http.delete(url);
  }
}
