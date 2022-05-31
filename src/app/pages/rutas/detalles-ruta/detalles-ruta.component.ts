import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IVisita } from 'src/app/interfaces/visita';
import { RutasService } from 'src/app/providers/rutas/rutas.service';
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
  visitas: Array<any> = [];
  isLoaing = true;
  hayDatos = true;
  private unsubscribeAll: Subject<any> = new Subject();
  loteForm: FormGroup = Object.create(null);

  constructor( private rutaResolver: RutasResolver, 
        private dialog: MatDialog, 
        private visitasService: VisitasService, 
        private fb: FormBuilder, 
        private rutasService: RutasService,
        private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    
    this.rutaResolver.onRutaChanged
    .pipe( takeUntil(this.unsubscribeAll) )
    .subscribe( resp => {
      this.ruta = resp
    });

    this.rutaResolver.onVisitaChanged
    .pipe( takeUntil(this.unsubscribeAll) )
    .subscribe( visitas => {
      this.visitas = visitas
    });

    this.loteForm = this.fb.group({
      lote:[this.ruta.lote]
    });
  }

  getSumKilos(){
    return this.visitas.reduce((sum, current) => sum + current.kilos, 0);
  }

  getSumEntregado() {
    return this.visitas.reduce((sum, current) => sum + current.entregado, 0);
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

  actualizarLote() {
    this.ruta.lote = this.loteForm.value.lote;
    this.rutasService.actualizarLote(this.ruta)
      .subscribe( resp => this._snackBar.open('Lote acualizado' ,'',  {
        duration: 2000}
        ));
  }

  revisar() {
    this.rutasService.marcarRevisada(this.ruta._id)
      .subscribe(resp => this._snackBar.open('Ruta revisada correctamente' ,'',  {
        duration: 2000}
        ));
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
