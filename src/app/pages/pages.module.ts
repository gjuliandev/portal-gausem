import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { UsuariosComponent } from './usuarios/usuarios/usuarios.component';
import { MaterialModule } from '../material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PipesModule } from '../pipes/pipes.module';
import { DialogComponent } from './usuarios/dialog/dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteDialogComponent } from './clientes/cliente-dialog/cliente-dialog.component';
import { ClienteProfileComponent } from './clientes/cliente-profile/cliente-profile.component';
import { ListRutasComponent } from './rutas/list-rutas/list-rutas.component';
import { DetallesRutaComponent } from './rutas/detalles-ruta/detalles-ruta.component';
import { PlanificacionComponent } from './planificacion/planificacion.component';
import { VisitaDialogComponent } from './rutas/visita-dialog/visita-dialog.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { AvatarComponent } from './usuarios/avatar/avatar.component';


@NgModule({
  declarations: [ UsuariosComponent,
                  DialogComponent,
                  ClientesComponent,
                  ClienteDialogComponent,
                  ClienteProfileComponent,
                  ListRutasComponent,
                  DetallesRutaComponent,
                  PlanificacionComponent,
                  VisitaDialogComponent,
                  AvatarComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    PipesModule,
    FormsModule,
    ReactiveFormsModule,
    ImageCropperModule
  ]
})
export class PagesModule { }
