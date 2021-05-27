import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'horasFromMinutes'
})
export class HorasFromMinutesPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {

    let horas = Math.trunc(value / 60);
    let minutos = value % 60;
    console.log('valor: ' + value);
    console.log('horas: ' + horas);
    console.log('minutos ' + minutos);


    return horas + 'h' + ' ' + minutos + 'min';
  }

}
