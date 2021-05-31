import { ThisReceiver } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IDireccion } from 'src/app/interfaces/direccion';
import { ClientesService } from 'src/app/providers/clientes/clientes.service';
import { DireccionesService } from 'src/app/providers/direcciones/direcciones.service';
import { ClienteResolver } from 'src/app/resolvers/cliente.resolver';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente-profile',
  templateUrl: './cliente-profile.component.html',
  styleUrls: ['./cliente-profile.component.scss']
})
export class ClienteProfileComponent implements OnInit, OnDestroy {

  cliente:   any = null;
  direccion: any = null;
  visitas:   Array<any> = [];
  private unsubscribeAll: Subject<any> = new Subject();

  addressForm: FormGroup = Object.create(null);

  action: string = '';

  constructor( private clienteResolver: ClienteResolver,
               private clienteService: ClientesService,
               private fb: FormBuilder,
               private direccionesService: DireccionesService ) { }

  ngOnInit(): void {
      this.clienteResolver.onClienteChanged
        .pipe( takeUntil(this.unsubscribeAll) )
        .subscribe( (item: any) => this.cliente = item
      );

      this.clienteResolver.onAddressChanged
        .pipe( takeUntil(this.unsubscribeAll) )
        .subscribe( (item: any) => {
            this.direccion = item;
            if (item) {
              this.crearFormulario('update');
            } else {
              this.direccion = {
                domicilio: '',
                poblacion: '',
                provincia: '',
                codPostal: ''
              }
              this.crearFormulario('add');
            }

        }
      );

      this.clienteResolver.onVisitasChanged
        .pipe( takeUntil(this.unsubscribeAll) )
        .subscribe( (items: Array<any>) => {
            this.visitas = items;
      });
  }

  crearFormulario(accion: string) {
    this.action = accion;
    this.addressForm = this.fb.group({
      domicilio: [this.direccion.domicilio ],
      poblacion: [this.direccion.poblacion ],
      provincia: [this.direccion.provincia ],
      codPostal: [this.direccion.codPostal ]
    });
  }

  actualizarDireccion() {

    const newDireccion: IDireccion = {
      domicilio: this.addressForm.value.domicilio,
      poblacion: this.addressForm.value.poblacion,
      provincia: this.addressForm.value.provincia,
      codPostal: this.addressForm.value.codPostal,
      cliente_id: this.cliente._id
    }

    switch(this.action) {
      case 'update':
        newDireccion._id  = this.direccion._id;
        this.direccionesService.actualizarDireccion(newDireccion)
          .subscribe( res => console.log(res));
        break;
      case 'add':
        this.direccionesService.crearDireccion(newDireccion)
          .subscribe( res => console.log(res));
        break;
      default:
       break;
    }

  }

  activar() {
    this.clienteService.activar(this.cliente)
      .subscribe( resp => {

        Swal.fire(
          'Cliente Activado',
          'El cliente ha sido activado correctamente.',
          'success'
        );
        this.clienteResolver.findCliente(this.cliente._id).then();
      });
  }

  desactivar() {
    this.clienteService.desactivar(this.cliente)
    .subscribe( resp => {
      Swal.fire(
        'Cliente Desactivado',
        'El cliente ha sido desactivado correctamente.',
        'success'
      );
      this.clienteResolver.findCliente(this.cliente._id).then();
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}
