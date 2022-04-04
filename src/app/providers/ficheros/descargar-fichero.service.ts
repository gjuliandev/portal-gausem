import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DescargarFicheroService {

  constructor( private http: HttpClient ) { }

  download( tipo: string, nombre: string = 'no-file') {
    const url = `${environment.base_url}/uploads/${tipo}/${nombre}`;
    this.http.get( url, { responseType: 'blob'})
      .subscribe( (response: any) => {
        const newBlob = new Blob( [(response)], {type: 'application/pdf'});
        const downloadUrl = URL.createObjectURL(newBlob);
        window.open(downloadUrl);
      })
  }


}
