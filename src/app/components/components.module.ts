import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KilosxmesComponent } from './charts/kilosxmes/kilosxmes.component';
import { KilosxrestauranteComponent } from './charts/kilosxrestaurante/kilosxrestaurante.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { BoxComponent } from './box/box.component';
import { MaterialModule } from '../material-module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [KilosxmesComponent, KilosxrestauranteComponent, BoxComponent],
  imports: [
    CommonModule,
    HighchartsChartModule,
    MaterialModule,
    FlexLayoutModule,
  ],
  exports: [ KilosxmesComponent, KilosxrestauranteComponent, BoxComponent]
})
export class ComponentsModule { }
