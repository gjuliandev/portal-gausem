import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ClientesService } from '../providers/clientes/clientes.service';
import { DireccionesService } from '../providers/direcciones/direcciones.service';
import { VisitasService } from '../providers/visitas/visitas.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteResolver implements Resolve<boolean> {

  onClienteChanged: BehaviorSubject<any> = new BehaviorSubject(undefined);
  onAddressChanged: BehaviorSubject<any> = new BehaviorSubject(undefined);
  onVisitasChanged: BehaviorSubject<any> = new BehaviorSubject(undefined);

  constructor(private clienteService: ClientesService,
              private direccionesService: DireccionesService,
              private visitasService: VisitasService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise( (resolve, reject) => {
      const id = route.params['id'];
      Promise.all([
        this.findCliente(id),
        this.findAddress(id),
        this.findVisitas(id)
      ])
      .then(  x => { resolve(true); })
      .catch( x => { reject(false); })
    });
  }

  findCliente(id: number) {
    return new Promise( (resolve, reject) => {
      this.clienteService.getCliente(id)
        .subscribe( cliente => {
          this.onClienteChanged.next(cliente);
          resolve(cliente);
        }, error => reject(null));
    });
  }

  findAddress(id: number) {
    return new Promise( (resolve, reject) => {
      this.direccionesService.getDireccion(id)
        .subscribe( direccion => {
          this.onAddressChanged.next(direccion);
          resolve(direccion);
        }, error => reject(null));
    });
  }

  findVisitas(id: number) {
    return new Promise( (resolve, reject) => {
      this.visitasService.getVisitasByCliente(id)
        .subscribe( (visitas: Array<any>) => {
          this.onVisitasChanged.next(visitas);
          resolve(visitas);
        }, error => reject(null));
    });
  }

}
