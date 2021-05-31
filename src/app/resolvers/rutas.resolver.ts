import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { RutasService } from '../providers/rutas/rutas.service';
import { VisitasService } from '../providers/visitas/visitas.service';

@Injectable({
  providedIn: 'root'
})
export class RutasResolver implements Resolve<boolean> {

  onRutaChanged: BehaviorSubject<any> = new BehaviorSubject(undefined);
  onVisitaChanged: BehaviorSubject<any> = new BehaviorSubject(undefined);

  constructor(private rutasService: RutasService,
              private visitassService: VisitasService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise( (resolve, reject) => {
      const id = route.params['id'];
      Promise.all([
        this.findRuta(id),
        this.findVisitas(id)
      ])
      .then(  x => { resolve(true); })
      .catch( x => { reject(false); })
    });
  }

  findRuta(id: number) {
    return new Promise( (resolve, reject) => {
      this.rutasService.getDetalleRuta(id)
        .subscribe( ruta => {
          this.onRutaChanged.next(ruta);
          resolve(ruta);
        }, error => reject(null));
    });
  }


  findVisitas(id: number) {
    return new Promise( (resolve, reject) => {
      this.visitassService.getVisitasByRuta(id)
        .subscribe( (visitas : Array<any>) => {
          this.onVisitaChanged.next(visitas);
          resolve(visitas);
        }, error => reject(null));
    });
  }


}
