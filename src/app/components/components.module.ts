import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KilosxmesComponent } from './charts/kilosxmes/kilosxmes.component';
import { KilosxrestauranteComponent } from './charts/kilosxrestaurante/kilosxrestaurante.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { BoxComponent } from './box/box.component';
import { MaterialModule } from '../material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TextComponent } from './text/text.component';
import { QuillModule } from 'ngx-quill';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [KilosxmesComponent, KilosxrestauranteComponent, BoxComponent, TextComponent],
  imports: [
    CommonModule,
    HighchartsChartModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),
  ],
  exports: [ KilosxmesComponent, KilosxrestauranteComponent, BoxComponent, TextComponent]
})
export class ComponentsModule { }
