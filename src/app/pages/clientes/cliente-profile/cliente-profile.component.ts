
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IDireccion } from 'src/app/interfaces/direccion';
import { ClientesService } from 'src/app/providers/clientes/clientes.service';
import { DireccionesService } from 'src/app/providers/direcciones/direcciones.service';
import { SubirFicheroService } from 'src/app/providers/ficheros/subir-fichero.service';
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

  imageChangedEvent: any = '';
  croppedImage: any = '';
  file: File = Object(null);

  private unsubscribeAll: Subject<any> = new Subject();

  addressForm: FormGroup = Object.create(null);

  action: string = '';

  constructor( private clienteResolver: ClienteResolver,
               private clienteService: ClientesService,
               private fb: FormBuilder,
               private direccionesService: DireccionesService,
               private subirFicheroService: SubirFicheroService
                ) { }

  ngOnInit(): void {
      this.clienteResolver.onClienteChanged
        .pipe( takeUntil(this.unsubscribeAll) )
        .subscribe( (item: any) => {
          this.cliente = item;
          console.log(JSON.stringify(this.cliente))}
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

  getSumKilos(){
    return this.visitas.reduce((sum, current) => sum + current.kilos, 0);
  }

  getSumEntregado() {
    return this.visitas.reduce((sum, current) => sum + current.entregado, 0);
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
      domicilio:  this.addressForm.value.domicilio,
      poblacion:  this.addressForm.value.poblacion,
      provincia:  this.addressForm.value.provincia,
      codPostal:  this.addressForm.value.codPostal,
      cliente_id: this.cliente._id
    }

    switch(this.action) {
      case 'update':
        newDireccion._id  = this.direccion._id;
        this.direccionesService.actualizarDireccion(newDireccion)
          .subscribe( res => {
            console.log(res);
            Swal.fire(
              'Dirección Actualizada',
              'Se ha actualizado la dirección correctamente',
              'success'
            );
          });
        break;
      case 'add':
        this.direccionesService.crearDireccion(newDireccion)
          .subscribe( res => {
            Swal.fire(
              'Dirección Añadida',
              'Se ha añadido la dirección correctamente',
              'success'
            );
            this.action = 'update';
          });
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


  // IMAGEN
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
      const imageName = 'image.png';
      const imageBlob = this.dataURItoBlob(this.croppedImage);
      const imageFile = new File([imageBlob], imageName, {type: 'image/png'});
      this.file = imageFile;
  }

  dataURItoBlob(croppedImage: any) {
   const byteString = atob(croppedImage.split(',')[1]);
   const mimeString = croppedImage.split(',')[0].split(':')[1].split(';')[0];
   const ab = new ArrayBuffer(byteString.length);
   const ia = new Uint8Array(ab);
   for (let i = 0; i < byteString.length; i++) {
     ia[i] = byteString.charCodeAt(i);
   }

   const blob = new Blob([ab], {type: mimeString});
   return blob; 
  }

  imageLoaded(image: LoadedImage) {
      // show cropper
  }
  cropperReady() {
      // cropper ready
  }
  loadImageFailed() {
      // show message
  }

  guardarLogo() {
    if (this.file) {
      this.subirFicheroService.upload(this.file, 'logo', this.cliente._id)
        .then( x=> { 
          Swal.fire(
            'Acutalización Logo',
            'El logo se ha actualizado correctamente.',
            'success'
          );
        });
    }
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}
