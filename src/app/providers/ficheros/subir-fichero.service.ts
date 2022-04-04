import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubirFicheroService {

  constructor() { }

  upload(fichero: File, tipo: string = '', id: number) {

    console.log(fichero);
    console.log(tipo);
    console.log(id);

    return new Promise( (resolve, reject) => {
      const formData = new FormData();
      const xhr = new XMLHttpRequest();

      formData.append('fichero', fichero, fichero.name);

      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4){
          if(xhr.status === 200 ) {
            resolve( JSON.parse( xhr.response ));
          } else {
            reject( xhr.response );
          }
        }
      };

      const url = `${environment.base_url}/file/${tipo}/${id}`;

      xhr.open( 'PUT', url, true );
      xhr.send( formData );
    });

  }
}
