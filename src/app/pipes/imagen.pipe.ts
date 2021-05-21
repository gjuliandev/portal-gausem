import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(value: string, tipo: string = 'avatar') {
    console.log('hay file? ' +value);
    console.log('tipo ' + tipo);
    if (!value) {

      return `${environment.base_url}/file/${tipo}/xxx`;
    }
    return `${environment.base_url}/file/${tipo}/${value}`;
  }

}
