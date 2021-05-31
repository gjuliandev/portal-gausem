import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { RutasService } from '../providers/rutas/rutas.service';
import { RutasPlanificadasService } from '../providers/rutas/rutas_planificadas';
import { UsuarioService } from '../providers/usuarios/usuario.service';
import { VisitasService } from '../providers/visitas/visitas.service';

@Injectable({
  providedIn: 'root'
})
export class PlanificacionResolver implements Resolve<boolean> {

  onRutaPlanificadaChanged: BehaviorSubject<any> = new BehaviorSubject(undefined);
  onUsuariosChanged:         BehaviorSubject<any> = new BehaviorSubject(undefined);

  constructor(private rutasPlanificadasService: RutasPlanificadasService,
              private usuarioService: UsuarioService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise( (resolve, reject) => {
      Promise.all([
        this.findRutasPlanificadas(),
        this.findUsuarios()
      ])
      .then(  x => { resolve(true); })
      .catch( x => { reject(false); })
    });
  }

  findRutasPlanificadas() {
    return new Promise( (resolve, reject) => {
      this.rutasPlanificadasService.getRutasPlanificadas()
        .subscribe( (rutas:Array<any>) => {
          this.onRutaPlanificadaChanged.next(rutas);
          resolve(rutas);
        }, error => reject(null));
    });
  }


  findUsuarios() {
    return new Promise( (resolve, reject) => {
      this.usuarioService.getUsuarios()
        .subscribe( (usuarios : Array<any>) => {
          this.onUsuariosChanged.next(usuarios);
          resolve(usuarios);
        }, error => reject(null));
    });
  }


}
