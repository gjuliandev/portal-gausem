import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagenPipe } from './imagen.pipe';
import { HorasFromMinutesPipe } from './horas-from-minutes.pipe';



@NgModule({
  declarations: [ImagenPipe, HorasFromMinutesPipe],
  imports: [
    CommonModule
  ],
  exports: [ImagenPipe, HorasFromMinutesPipe]
})
export class PipesModule { }
