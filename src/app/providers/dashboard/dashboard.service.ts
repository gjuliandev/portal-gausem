import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getKilosRestaurante(anio: number = 0) {
    const url = `${environment.base_url}/dashboard/kilosxrestuarante/`;
    return this.http.get(url)
      .pipe(
        map( (res: any) => res['payload'])
      );
  }


  getKilosMes(anio: number = 0) {
    const url = `${environment.base_url}/dashboard/kilosxmes/`;
    return this.http.get(url)
      .pipe(
        map( (res: any) => res['payload'])
      );
  }

  getVisitasByAnio( anio: number = 0) {
    const url = `${environment.base_url}/dashboard/visitasxanio/`;
    return this.http.get(url)
      .pipe(
        map( (res: any) => res['payload'])
      );
  }


}
