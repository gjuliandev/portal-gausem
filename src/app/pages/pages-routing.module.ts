import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClienteResolver } from '../resolvers/cliente.resolver';
import { PlanificacionResolver } from '../resolvers/planificacion.resolver';
import { RutasResolver } from '../resolvers/rutas.resolver';
import { ClienteProfileComponent } from './clientes/cliente-profile/cliente-profile.component';
import { ClientesComponent } from './clientes/clientes.component';
import { PlanificacionComponent } from './planificacion/planificacion.component';
import { DetallesRutaComponent } from './rutas/detalles-ruta/detalles-ruta.component';
import { ListRutasComponent } from './rutas/list-rutas/list-rutas.component';
import { UsuariosComponent } from './usuarios/usuarios/usuarios.component';

const routes: Routes = [
  {
    path: 'usuarios',
    component: UsuariosComponent,
    data: {
      title: 'Listado de Usuarios',
      urls: [
          { title: 'Administración', url: '/admin/usuarios' },
          { title: 'Usuarios' }
      ]
    }
  },
  {
    path: 'clientes',
    component: ClientesComponent,
    data: {
      title: 'Listado de Clientes',
      urls: [
          { title: 'Administración', url: '/admin/clientes' },
          { title: 'Clientes' }
      ]
    }
  },
  {
    path: 'clientes/:id',
    component: ClienteProfileComponent,
    resolve: { cliente: ClienteResolver },
    data: {
      title: 'Detalles del Cliente',
      urls: [
          { title: 'Administración', url: '/admin/clientes/detalles' },
          { title: 'Detalles del Cliente' }
      ]
    }
  },
  {
    path: 'rutas',
    component: ListRutasComponent,
    data: {
      title: 'Listado de Rutas Realizadas',
      urls: [
          { title: 'Planificación', url: '/planificacion/rutas' },
          { title: 'Listado de Rutas' }
      ]
    }
  },
  {
    path: 'rutas/:id',
    component: DetallesRutaComponent,
    resolve: {ruta: RutasResolver },
    data: {
      title: 'Detalles de la Ruta',
      urls: [
          { title: 'Planificación', url: '/planificacion/rutas/detalle' },
          { title: 'Detalles Ruta' }
      ]
    }
  },
  {
    path: 'planificar',
    component: PlanificacionComponent,
    resolve: { planificacion: PlanificacionResolver },
    data: {
      title: 'Planificación Ruta',
      urls: [
          { title: 'Planificación', url: '/planificacion/planificar' },
          { title: 'Planificación Ruta' }
      ]
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
