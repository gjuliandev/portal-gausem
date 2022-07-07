import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICliente } from 'src/app/interfaces/cliente';
import { IUsuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/providers/usuarios/usuario.service';

@Component({
  selector: 'app-cliente-dialog',
  templateUrl: './cliente-dialog.component.html',
  styleUrls: ['./cliente-dialog.component.scss']
})
export class ClienteDialogComponent implements OnInit{

  action: string | null = null;
  local_data: any;
  clientForm: FormGroup = Object.create(null);
  usuarios: Array<IUsuario> = [];

  constructor(public dialogRef: MatDialogRef<ClienteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ICliente,
              private fb: FormBuilder,
              private usuariosService: UsuarioService) {

                this.local_data = { ...data };
                this.action = this.local_data.action; //Add, Update, Delete
                this.clientForm = this.fb.group({
                  nombreComercial: [this.local_data.nombreComercial, Validators.required],
                  nombreFiscal: [this.local_data.nombreFiscal],
                  siglas: [this.local_data.siglas],
                  cif: [this.local_data.cif],
                  abonado: [this.local_data.abonado, Validators.required],
                  IBAN: [this.local_data.IBAN],
                  notas: [this.local_data.notas],
                  cantidad_abonada: [this.local_data.cantidad_abonada],
                  periodicidad: [this.local_data.periodicidad, Validators.required],
                  consumo: [this.local_data.consumo],
                  fecha_alta: [this.local_data.fecha_alta, Validators.required],
                  renovacion_certificado: [this.local_data.renovacion_certificado],
                  usuario_id: [this.local_data.usuario_id]
                });
                
              }
  ngOnInit(): void {
    this.usuariosService.getUsuarios()
      .subscribe( resp => {
        this.usuarios = resp;
      })
  }


  doAction() {
    const cliente: ICliente = {
      _id:                    this.local_data._id,
      nombreComercial:        this.clientForm.value.nombreComercial,
      nombreFiscal:           this.clientForm.value.nombreFiscal,
      siglas:                 this.clientForm.value.siglas,
      cif:                    this.clientForm.value.cif,
      abonado:                this.clientForm.value.abonado,
      IBAN:                   this.clientForm.value.IBAN,
      notas:                  this.clientForm.value.notas,
      cantidad_abonada:       this.clientForm.value.cantidad_abonada,
      periodicidad:           this.clientForm.value.periodicidad,
      consumo:                this.clientForm.value.consumo,
      fecha_alta:             this.clientForm.value.fecha_alta,
      renovacion_certificado: this.clientForm.value.renovacion_certificado,
      proxima_visita:         this.clientForm.value.proxima_visita,
      usuario_id:             this.clientForm.value.usuario_id
    }
    this.dialogRef.close({ event: this.action, data: cliente });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }

}
