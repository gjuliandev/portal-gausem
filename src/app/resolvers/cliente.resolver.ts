import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ClientesService } from '../providers/clientes/clientes.service';
import { DireccionesService } from '../providers/direcciones/direcciones.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteResolver implements Resolve<boolean> {

  onClienteChanged: BehaviorSubject<any> = new BehaviorSubject(undefined);
  onAddressChanged: BehaviorSubject<any> = new BehaviorSubject(undefined);

  constructor(private clienteService: ClientesService,
              private direccionesService: DireccionesService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise( (resolve, reject) => {
      const id = route.params['id'];
      Promise.all([
        this.findCliente(id),
        this.findAddress(id)
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


}
