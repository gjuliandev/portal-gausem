import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PlanificacionService {

  constructor( private http: HttpClient ) { }


  getClientesAPlanificar(fecha: Date) {

    const url = `${environment.base_url}/clientes/planificacion/${fecha}`;
    return this.http.get(url)
      .pipe(
        map( (res: any) => res['payload'])
      );
  }


}
