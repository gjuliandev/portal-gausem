import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(value: string, tipo: string = 'avatar') {
    if (!value) {

      return `${environment.base_url}/file/${tipo}/xxx`;
    }
    return `${environment.base_url}/file/${tipo}/${value}`;
  }

}
