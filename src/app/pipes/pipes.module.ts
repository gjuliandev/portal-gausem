import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagenPipe } from './imagen.pipe';
import { HorasFromMinutesPipe } from './horas-from-minutes.pipe';
import { NombreClientePipe } from './nombre-cliente.pipe';



@NgModule({
  declarations: [ImagenPipe, HorasFromMinutesPipe, NombreClientePipe],
  imports: [
    CommonModule
  ],
  exports: [ImagenPipe, HorasFromMinutesPipe, NombreClientePipe]
})
export class PipesModule { }
