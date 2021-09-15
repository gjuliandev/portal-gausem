import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { RutasService } from '../providers/rutas/rutas.service';
import { UsuarioService } from '../providers/usuarios/usuario.service';
import { VisitasService } from '../providers/visitas/visitas.service';

@Injectable({
  providedIn: 'root'
})
export class PlanificacionResolver implements Resolve<boolean> {

  onRutaPlanificadaChanged: BehaviorSubject<any> = new BehaviorSubject(undefined);
  onUsuariosChanged:         BehaviorSubject<any> = new BehaviorSubject(undefined);

  constructor(private usuarioService: UsuarioService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise( (resolve, reject) => {
      Promise.all([
        this.findUsuarios()
      ])
      .then(  x => { resolve(true); })
      .catch( x => { reject(false); })
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
