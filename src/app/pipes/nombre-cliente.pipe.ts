import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'nombreCliente'
})
export class NombreClientePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {

    if (!value) {
      return `${environment.base_url}/clientes/0`;
    }
    return `${environment.base_url}/clientes/${value}`;
  }

}
