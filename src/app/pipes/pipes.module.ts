import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagenPipe } from './imagen.pipe';
import { HorasFromMinutesPipe } from './horas-from-minutes.pipe';
import { NombreClientePipe } from './nombre-cliente.pipe';
import { EstadoRutaPipe } from './estado-ruta.pipe';



@NgModule({
  declarations: [ImagenPipe, HorasFromMinutesPipe, NombreClientePipe, EstadoRutaPipe],
  imports: [
    CommonModule
  ],
  exports: [ImagenPipe, HorasFromMinutesPipe, NombreClientePipe, EstadoRutaPipe]
})
export class PipesModule { }
