import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { ICliente } from 'src/app/interfaces/cliente';
import { PlanificacionService } from 'src/app/providers/planificacion/planificacion.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IRuta } from 'src/app/interfaces/ruta';
import { PlanificacionResolver } from 'src/app/resolvers/planificacion.resolver';
import { debounce, debounceTime, distinctUntilChanged, takeUntil, tap } from 'rxjs/operators';
import { BehaviorSubject, combineLatest, fromEvent, Subject } from 'rxjs';
import * as moment from 'moment';
import Swal from 'sweetalert2';
import { RutasService } from 'src/app/providers/rutas/rutas.service';
import { VisitasService } from 'src/app/providers/visitas/visitas.service';
import { IVisita } from 'src/app/interfaces/visita';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-planificacion',
  templateUrl: './planificacion.component.html',
  styleUrls: ['./planificacion.component.scss']
})
export class PlanificacionComponent implements OnInit, OnDestroy{

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
                          // this.ruta.visitas = [];
                          // const visitas: any = [...event.container.data]
                          // this.ruta.visitas = [...visitas];
                        } else {
                          this.visitasCard = [];
                          const visitas: any = [...event.previousContainer.data]
                          this.ruta.visitas = visitas;
                        } // Eliminamos de la visita;

    }
  }

  usuarios: Array<ICliente> = []; // para el select de comerciales

  clientesFiltering: Array<any> = [];
  clientesCard: Array<any> = []; // Para el taskboard de clientes
  visitasCard:  Array<any> = []; // Para el taskboard de visitas

  ruta:      IRuta =  Object.create(null);
  rutaForm:  FormGroup = Object.create(null);
  fechaRuta: any;
  planifica: boolean = true; // Para mostrar los datos del tasckboard

  isNew=true;

  // DATOS QUE VIENEN DEL OTRO FORMULARIO
  comercial: any = '';
  fecha: any = '';

  showAllClients = false;

  filters: { query$: BehaviorSubject<string>;
             mostrarTodo$: BehaviorSubject<boolean>} = 
             {query$: new BehaviorSubject(''),
              mostrarTodo$: new BehaviorSubject<boolean>(false)};

  @ViewChild('input') input!:ElementRef

  private unsubscribeAll: Subject<any> = new Subject();

  constructor( private planificacionService: PlanificacionService,
               private fb: FormBuilder,
               private planificacionResolver: PlanificacionResolver,
               private rutaService: RutasService,
               private visitasService: VisitasService,
               private router: Router,
               private snackBar: MatSnackBar)
  {

    const navigation = this.router.getCurrentNavigation(); //Obtenemos los parametros que me indica el componente que me llama

    // Comrpobamos si ha datos de la ruta o no (seria una edicion o una nueva ruta)
    if ( navigation?.extras.state) {
      this.comercial = navigation.extras.state.usuario_id;
      this.fechaRuta = navigation.extras.state.fecha;
      this.isNew = false;
      this.rutaService.getRutaByParams( this.comercial, moment(this.fechaRuta).format('YYYY-MM-DD'))
        .subscribe( (ruta: IRuta) => {
          if (ruta) {
            this.ruta = ruta; // Asignamos la ruta que nos devuelve la base de datos
            this.cargarVisitasRuta();
          }
        });
      }

      this.planificacionResolver.onUsuariosChanged
        .pipe( takeUntil(this.unsubscribeAll) )
        .subscribe( (items: Array<any>) => {
          this.usuarios = items;
        }
      );

      this.rutaForm = this.fb.group({
        fecha:     [this.fechaRuta, Validators.required],
        comercial: [this.comercial, Validators.required],
      });
  }
  ngOnInit(): void {
    
    combineLatest([this.filters.query$, this.filters.mostrarTodo$])
      .pipe(
        takeUntil(this.unsubscribeAll)
      )
      .subscribe( ([query, mostrarTodos]) => {

        // Reset the filtered issues
        this.clientesFiltering = this.clientesCard;

        // Filter by search term
        if (query!=='') {
          this.clientesFiltering = this.clientesFiltering.filter( x => x.nombreComercial.toLocaleUpperCase().includes(query.toLocaleUpperCase()));
        }

      });
  }

  applyFilter(e: any) {
    this.filters.query$.next(e);
    
   /*  fromEvent(this.input.nativeElement, 'keyup') 
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap( () => {
         
        })
      )
      .subscribe(); */
  }

  findClientesAPlanificar() {
   
    this.clientesCard = [];
    this.clientesFiltering = [];
    this.fechaRuta = moment(this.fechaRuta).format('YYYY-MM-DD');
    this.planificacionService.getClientesAPlanificar( this.fechaRuta, this.showAllClients )
    .subscribe( (clientes: any[])=> {
           
      for(let i = 0; i < clientes.length; i++){
        let result = this.clientesCard.findIndex(x => x._id === clientes[i]._id);
         if ( this.clientesCard.findIndex(x => x._id === clientes[i]._id) === -1 ) {
          this.addCliente(clientes[i]);
        } 
      }
    });
  }

  addCliente( cliente: any ) {

   
    if ( this.clientesCard.indexOf(cliente._id) === -1) {

      let newClientCard: any = {
        cliente_id:      cliente._id,
        nombreComercial: cliente.nombreComercial,
        restan:          cliente.restan,
        domicilio:       cliente.domicilio,
        poblacion:       cliente.poblacion,
        orden:           0,
        ruta_id:         this.ruta._id
      }
      this.clientesCard.push(newClientCard); //Añadimos a clientes card
      this.clientesFiltering.push(newClientCard);

    } 

    // Si hay cliente y le restan 0 días, entonces debemos de añadirlo directamente al array de visitas
    // pero hay que tener cuidado que no este ya añadido 
    /* if (cliente && cliente.restan === 0) {
      
      let visita: any = {
        cliente_id:      cliente._id,
        nombreComercial: cliente.nombreComercial,
        restan:          cliente.restan,
        domicilio:       cliente.domicilio,
        poblacion:       cliente.poblacion,
        orden:           0,
        ruta_id:         this.ruta._id,
        persistente:     false
      } 
      // this.ruta.visitas.push(visita); // Añadimos el cliente al array de visitas
         
    } else {

        if ( this.clientesCard.indexOf(cliente._id) > -1) {

          console.log('el cliente ya etá en el array');

        } else {

          let newClientCard: any = {
            cliente_id:      cliente._id,
            nombreComercial: cliente.nombreComercial,
            restan:          cliente.restan,
            domicilio:       cliente.domicilio,
            poblacion:       cliente.poblacion,
            orden:           0,
            ruta_id:         this.ruta._id
          }
          this.clientesCard.push(newClientCard); //Añadimos a clientes card
        }
      
    }*/
  }

  mover(e: any){
    this.ruta.visitas.push(e);
    this.clientesFiltering = this.clientesCard = this.clientesCard.filter( x => x.cliente_id !== e.cliente_id);
  }

  crearRuta() {

    this.fechaRuta = this.rutaForm.value.fecha;
    this.comercial = this.rutaForm.value.comercial;

    this.rutaService.getRutaByParams( this.comercial, moment(this.fechaRuta).format('YYYY-MM-DD'))
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
              this.ruta = ruta; // Asignamos la ruta que nos devuelve la base de datos
              this.isNew = false;
              this.cargarVisitasRuta();
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
            if (result.isConfirmed){
              this.isNew = true;
              this.ruta = {
                fecha: moment(this.fechaRuta).format('YYYY-MM-DD'),
                usuario_id: this.rutaForm.value.comercial,
                estado: 0,
                visitas: []
              }
              this.abrirRuta('add');
            }
          });
        }
      });
  }

  abrirRuta(action: string = 'add' ) {
    switch (action) {
      case 'add':
      this.rutaService.crearRuta(this.ruta)
        .subscribe( (resp: any) => {
          Swal.fire(
            'Ruta creada correctamente?',
            'Se ha creado la ruta con id ' + resp.payload.insertId,
            'success'
          );
          this.ruta._id = resp.payload.insertId;
          this.cargarVisitasRuta();
        });
       break;

      case 'default':
        Swal.fire('Oops...', 'Se ha producido un error al obtener la ruta!', 'error');
        break;
    }

  }

  guardarRuta() {

    Swal.fire({
      title: 'Guardar Ruta',
      text: 'Esta a punto de guardar las visitas de la Ruta, ¿Está seguro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, guardar visitas!',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed){

        this.visitasService.eliminarVisitasRuta(this.ruta._id)
        .subscribe( resp => {

          for (let i = 0; i < this.ruta.visitas.length; i ++) {

            this.ruta.visitas[i].orden = i;

            let visita: IVisita = {
              fecha: this.ruta.fecha,
              tipo: 'RECOGIDA',
              cliente_id: this.ruta.visitas[i].cliente_id,
              orden: i,
              ruta_id: this.ruta._id || 0
            }
            this.visitasService.crearVisita(this.ruta.visitas[i])
              .subscribe();

            if (i == this.ruta.visitas.length - 1) {
              this.snackBar.open('Se ha guardado la planificación de la ruta correctamente', 'Guardar Visitas',       { duration: 2000 });
              this.router.navigateByUrl('/planificacion/rutas')
            }
          }
        }, error => this.snackBar.open('Se ha producido un error ' + error, 'Guardar Visitas',       { duration: 2000 }) );
      }
    });

  }

  resetVisitas( ) {
    Swal.fire({
      title: 'Eliminar Visitas',
      text: `¿Seguro que desea eliminar las visitas?` ,
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed){
        this.visitasService.eliminarVisitasRuta( this.ruta._id )
          .subscribe( resp => {
            this.ruta.visitas=[];
            this.findClientesAPlanificar();
            this.snackBar.open('Visitas eliminadas correctamente', 'Reset Visitas',       { duration: 1500 });
          }, (error) => this.snackBar.open('Se ha producido un error', 'Reset Visitas', { duration: 1500})
        )};
    });

  }

  cargarVisitasRuta(){
    this.visitasService.getVisitasByRuta(this.ruta._id)
    .subscribe( resp => {
      this.ruta.visitas = resp;
      this.planifica = true;
      this.findClientesAPlanificar();
    });
  }

  toggleCoompleted( e: any ) {
    this.filters.mostrarTodo$.next(e.checked);

    console.log(this.showAllClients, e.checked);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}
