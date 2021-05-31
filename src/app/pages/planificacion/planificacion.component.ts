import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { ICliente } from 'src/app/interfaces/cliente';
import { PlanificacionService } from 'src/app/providers/planificacion/planificacion.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IRuta } from 'src/app/interfaces/ruta';
import { PlanificacionResolver } from 'src/app/resolvers/planificacion.resolver';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { RutasService } from 'src/app/providers/rutas/rutas.service';
import { VisitasService } from 'src/app/providers/visitas/visitas.service';
import { IVisita } from 'src/app/interfaces/visita';

@Component({
  selector: 'app-planificacion',
  templateUrl: './planificacion.component.html',
  styleUrls: ['./planificacion.component.scss']
})
export class PlanificacionComponent implements OnInit , OnDestroy{

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);

                        if (event.container.id === 'route') {
                          // añadimos al array de visitas en la ruta
                          this.visitasCard = [];
                          this.visitasCard = [...event.container.data];

                        } else {
                          this.visitasCard = [];
                          this.visitasCard = [...event.previousContainer.data];
                        } // Eliminamos de la visita;

    }
  }

  rutasPlanificadas: Array<ICliente> = []; // para el select de rutas
  usuarios:          Array<ICliente> = []; // para el select de coemerciales

  clientesCard: Array<any> = []; // Para el taskboard de clientes
  visitasCard:  Array<any> = []; // Para el taskboard de visitas

  ruta:              IRuta =  Object.create(null);
  rutaForm:          FormGroup = Object.create(null);
  fechaRuta:         any;
  planifica:         boolean = false; // Para mostrar los datos del tasckboard


  private unsubscribeAll: Subject<any> = new Subject();

  constructor( private planificacionService: PlanificacionService,
               private fb: FormBuilder,
               private planificacionResolver: PlanificacionResolver,
               private rutaService: RutasService,
               private visitasService: VisitasService )
  {
      this.planificacionResolver.onRutaPlanificadaChanged
        .pipe( takeUntil(this.unsubscribeAll) )
        .subscribe( (items: Array<any>) => this.rutasPlanificadas = items
      );

      this.planificacionResolver.onUsuariosChanged
        .pipe( takeUntil(this.unsubscribeAll) )
        .subscribe( (items: Array<any>) => {
          this.usuarios = items;
          console.log('Items: ' + items);
          console.log('Usuarios: ' + this.usuarios);
        }
      );

      this.rutaForm = this.fb.group({
        fecha:          ['', Validators.required],
        rutaPlanificada:['', Validators.required],
        comercial:      ['', Validators.required],
      });
  }

  ngOnInit(): void { }

  findClientesAPlanificar() {
    this.fechaRuta = moment(this.fechaRuta).format('YYYY-MM-DD');
    this.planificacionService.getClientesAPlanificar( this.fechaRuta )
    .subscribe( (clientes: any[])=> {
      for(let i = 0; i < clientes.length; i++){
        this.addCliente(clientes[i], i);
      }
    });
  }

  crearRuta() {

    this.fechaRuta = this.rutaForm.value.fecha;
    this.visitasCard.splice(0,this.visitasCard.length);

    this.rutaService.getRutaByParams( this.rutaForm.value.comercial, moment(this.fechaRuta).format('YYYY-MM-DD'))
      .subscribe( (ruta: IRuta) => {
        if (ruta) {
          Swal.fire({
            title: 'Editar Ruta',
            text: 'La ruta que desea crear ya existe en el sistema, ¿Desea abrir la ruta?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, abrir ruta!',
            cancelButtonText: 'No'
          }).then((result) => {
            if (result.isConfirmed){
              this.abrirRuta( ruta, 'update' );
            }
          });

        } else {
          Swal.fire({
            title: 'Nueva Ruta',
            text: 'Esta a punto de crear una nueva ruta, ¿Está seguro?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, crear nueva ruta!',
            cancelButtonText: 'No'
          }).then((result) => {
            console.log('form ' + JSON.stringify(this.rutaForm.value));
            if (result.isConfirmed){
                this.abrirRuta({ fecha:              moment(this.fechaRuta).format('YYYY-MM-DD'),
                                usuario_id:          this.rutaForm.value.comercial,
                                ruta_planificada_id: this.rutaForm.value.rutaPlanificada}, 'add');
            }
          });
        }
      });
  }

  abrirRuta( ruta: IRuta, action: string = 'add' ) {

    switch (action) {
      case 'add':
      console.log('vamoa a crear la ruta ' + JSON.stringify(ruta));
      this.rutaService.crearRuta(ruta)
        .subscribe( (resp: any) => {
          Swal.fire(
            'Ruta creada correctamente?',
            'Se ha creado la ruta con id ' + resp.payload.insertId,
            'success'
          )
          this.ruta._id = resp.payload.insertId;
          this.visitasCard = [];
        });
       break;
      case 'update':
        this.ruta = ruta;
        this.visitasService.getVisitasByRuta(ruta._id)
          .subscribe ( (visitas: Array<any>) => {
            for(let i = 0; i < visitas.length; i++){
              this.addVisitas(visitas[i], i);
          }
      });
        break;
      case 'default':
        Swal.fire('Oops...', 'Se ha producido un error al obtener la ruta!', 'error');
        break;
    }

    this.planifica = true;
    this.findClientesAPlanificar();

  }

  addCliente( cliente: any, index: number ) {
    let newClientCard: any = {
      cliente_id:      cliente._id,
      nombreComercial: cliente.nombreComercial,
      restan:          cliente.restan,
      domicilio:       cliente.domicilio,
      poblacion:       cliente.poblacion,
      orden:           0,
      ruta_id:         this.ruta._id
    }

    this.clientesCard[index] = newClientCard; //Añadimos a clientes card
  }

  addVisitas(visita: any, index: number ) {
    let newVisitaCard: any = {
      cliente_id:       visita.cliente_id,
      ruta_id:          this.ruta._id,
      nombreComercial:  visita.nombreComercial,
      orden:            visita.orden,
      domicilio:        visita.domicilio,
      poblacion:        visita.poblacion
    }
    this.visitasCard[index] = newVisitaCard;
  }


  guardarRuta(myRoute: any) {
    Swal.fire({
      title: 'Guardar Ruta',
      text: 'Esta a punto de guardar las visitas de la Ruta, ¿Está seguro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, guardar visitas!',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed){
        let visitasGuardadas = 0;
        let visitasErroneas = 0;
        for (let i = 0; i < this.visitasCard.length; i ++) {
          this.visitasCard[i].orden = i;
          let visita: IVisita = {
            fecha: this.ruta.fecha,
            cliente_id: this.visitasCard[i].cliente_id,
            orden: i,
            ruta_id: this.ruta._id || 0
          }
          this.visitasService.crearVisita(visita)
            .subscribe( resp => {
              visitasGuardadas += 1;
              console.log('Se ha guardado la visita: ' + visita);
            });
        }

        if (this.visitasCard.length === visitasGuardadas) {
          console.log('Se han guardado todas la visitas correctamente' );
        }

      }
    });

  }

  resetVisitas( ) {
    this.visitasCard = [];
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}
