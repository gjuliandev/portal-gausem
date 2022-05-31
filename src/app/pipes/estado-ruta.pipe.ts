import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estadoRuta'
})
export class EstadoRutaPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    let estado: string = '';
    switch(value) {
      case 0:
        estado = 'PLANIFICADA';
        break;
      case 1:
        estado = 'REALIZADA';
        break;
      case 2:
        estado = 'EN PROGRESO';
        break;
      case 3:
        estado = 'CANCELADA';
        break;
      case 4:
        estado = 'REVISADA';
        break;
      default:
        break;
    }
    return estado;
  }

}
