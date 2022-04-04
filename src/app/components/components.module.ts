import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KilosxmesComponent } from './charts/kilosxmes/kilosxmes.component';
import { KilosxrestauranteComponent } from './charts/kilosxrestaurante/kilosxrestaurante.component';

@NgModule({
  declarations: [KilosxmesComponent, KilosxrestauranteComponent],
  imports: [
    CommonModule
  ],
  exports: [ KilosxmesComponent, KilosxrestauranteComponent]
})
export class ComponentsModule { }
