import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ClientesService } from '../providers/clientes/clientes.service';
import { DashboardService } from '../providers/dashboard/dashboard.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardResolver implements Resolve<boolean> {

  onClientesChanged: BehaviorSubject<any> = new BehaviorSubject(undefined);
  onVisitaChanged: BehaviorSubject<any> = new BehaviorSubject(undefined);

  constructor( private clientesService: ClientesService, 
    private dashboardService: DashboardService ) { }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise( (resolve, reject) => {
      const id = route.params['id'];
      Promise.all([
        this.getClientes(),
        this.getVisitas()
      ])
      .then(  x => { resolve(true); })
      .catch( x => { reject(false); })
    });
  }

  getClientes() {
    return new Promise( (resolve, reject) => {
      this.clientesService.getClientes()
      .subscribe( clientes => {
        this.onClientesChanged.next(clientes);
            resolve(clientes);
          }, error => reject(null));
    });
  }

  getVisitas() {
    return new Promise( (resolve, reject) => {
      this.dashboardService.getVisitasByAnio()
      .subscribe( resp => {
        this.dashboardService.getVisitasByAnio()
        .subscribe( (visitas : Array<any>) => {
            this.onVisitaChanged.next(visitas);
            resolve(visitas);
        }, error => reject(null));
      });    
    });
  }
}
