import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RutasPlanificadasService {

  constructor(private http: HttpClient) { }

  getRutasPlanificadas ( ) {
    const url = `${environment.base_url}/rutas-planificadas`;
    return this.http.get(url)
      .pipe(
        map( (res: any) => res['payload'])
      );
  }


}
