import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IRuta } from 'src/app/interfaces/ruta';
import { IVisita } from 'src/app/interfaces/visita';
import { VisitasService } from 'src/app/providers/visitas/visitas.service';
import { RutasResolver } from 'src/app/resolvers/rutas.resolver';
import { VisitaDialogComponent } from '../visita-dialog/visita-dialog.component';

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

  constructor( private rutaResolver: RutasResolver, private dialog: MatDialog, private visitasService: VisitasService) { }

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


openDialog(action: string, obj: any) {

    obj.action = action; // Añadimos al objeto cliente el campo action (Add, Update, Delete)

    const dialogRef = this.dialog.open(VisitaDialogComponent, {data: obj, disableClose: true});

    dialogRef.afterClosed()
      .subscribe( result => {

        switch(result.event) {
          case 'Add':
            console.log('Add', result.event);
            break;
          case 'Update':
            
            this.visitasService.actualizarVisita(result.data)
            .subscribe(res =>  {
              this.isLoaing = true;
              this.rutaResolver.findVisitas(this.ruta._id);
            });
            break;
          case 'Delete':
            console.log('Delete', result.event);
            this.visitasService.eliminarVisita(result.data)
            .subscribe(res =>  {
              this.isLoaing = true;
              this.rutaResolver.findVisitas(this.ruta._id);
            });
            break;
          default:
            break;
        }
      });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
