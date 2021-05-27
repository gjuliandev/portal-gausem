import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IRuta } from 'src/app/interfaces/ruta';
import { IVisita } from 'src/app/interfaces/visita';
import { VisitasService } from 'src/app/providers/visitas/visitas.service';
import { RutasResolver } from 'src/app/resolvers/rutas.resolver';

@Component({
  selector: 'app-detalles-ruta',
  templateUrl: './detalles-ruta.component.html',
  styleUrls: ['./detalles-ruta.component.scss']
})
export class DetallesRutaComponent implements OnInit, OnDestroy {
  ruta: any;
  visitas: Array<IVisita> = [];
  isLoaing = true;
  hayDatos = true;
  private unsubscribeAll: Subject<any> = new Subject();

  constructor( private rutaResolver: RutasResolver) { }

  ngOnInit(): void {
    this.rutaResolver.onRutaChanged
    .pipe( takeUntil(this.unsubscribeAll) )
    .subscribe( resp => {
      this.ruta = resp
      console.log(resp);
    });

  this.rutaResolver.onVisitaChanged
    .pipe( takeUntil(this.unsubscribeAll) )
    .subscribe( visitas => {
      this.visitas = visitas
      console.log(visitas);
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
