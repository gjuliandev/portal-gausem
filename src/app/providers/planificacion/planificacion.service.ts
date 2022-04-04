import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlanificacionService {

  constructor( private http: HttpClient ) { }


  getClientesAPlanificar(fecha: Date, showAllClients: boolean = false) {

    const url = `${environment.base_url}/clientes/planificacion/${fecha}`;
    return this.http.get(url, {
      params: new HttpParams()
        .set('mostrarTodos', showAllClients.toString())
    })
      .pipe(
        map( (res: any) => res['payload'])
      );
  }


}
