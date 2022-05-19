import { Component, AfterViewInit, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IKpi } from '../interfaces/kpi';
import { DashboardResolver } from '../resolvers/dashboard.resolver';


@Component({
  selector: 'app-starter',
  templateUrl: './starter.component.html',
  styleUrls: ['./starter.component.scss']
})
export class StarterComponent implements OnInit {
  isLoaing = false;
  clientes: Array<any> = [];
  visitas: Array<any> = [];
  kilos = 0;
  entregado = 0;
  clientesActivos = 0;

  kpis: Array<IKpi> = [];
  private unsubscribeAll: Subject<any> = new Subject();
  
  constructor(private dashboardResolver: DashboardResolver ) { }

  ngOnInit(): void {

    this.dashboardResolver.onClientesChanged
    .pipe( takeUntil(this.unsubscribeAll) )
    .subscribe( (item: Array<any>) => {
        
        let clientesTotales: any = {
          titulo: 'Clientes',
          subtitulo: 'Totales',
          valor: item.length
        } 
        this.kpis.push(clientesTotales);

        let clientesActivos: any = {
          titulo: 'Clientes',
          subtitulo: 'activos',
          valor: item.filter( x => x.abonado === 1).length
        }
        this.kpis.push(clientesActivos);

    });

    this.dashboardResolver.onVisitaChanged
    .pipe( takeUntil(this.unsubscribeAll) )
    .subscribe( (item: any) => {
      let newItem: any = {
        titulo: 'Visitas',
        subtitulo: moment().format('YYYY'),
        valor: item.length
      }
      this.kpis.push(newItem);
      this.visitas = item;
    });

    let kpiKilos = {
      titulo: 'Kilos Recogidos',
      subtitulo: moment().format('YYYY'),
      valor: this.getSumKilos()
    }
    this.kpis.push (kpiKilos);

    let kpiVikpiEntregado = {
      titulo: '€ Total Entregado',
      subtitulo: moment().format('YYYY'),
      valor: this.getSumEntregado()
    }
    this.kpis.push(kpiVikpiEntregado);
  } 
  
  getSumKilos() {
    return this.visitas.reduce((sum, current) => sum + current.kilos, 0);
  }

  getSumEntregado() {
    return this.visitas.reduce((sum, current) => sum + current.entregado, 0);
  }

}
