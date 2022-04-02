import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IVisita } from 'src/app/interfaces/visita';

@Component({
  selector: 'app-visita-dialog',
  templateUrl: './visita-dialog.component.html',
  styleUrls: ['./visita-dialog.component.scss']
})
export class VisitaDialogComponent implements OnInit {

  action: string | null = null;
  local_data: any;
  visitaForm: FormGroup = Object.create(null);

  constructor( 
    public dialogRef: MatDialogRef<VisitaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IVisita,
    private fb: FormBuilder 
    ) {
        this.local_data = { ...data };
        console.log(this.local_data);
        this.action = this.local_data.action; //Add, Update, DeleteS
        this.visitaForm = this.fb.group({
          bidones:   [this.local_data.bidones],
          kilos:     [this.local_data.kilos],
          entregado: [this.local_data.entregado],
          nAlbaran:  [this.local_data.nAlbaran],
          notas:     [this.local_data.notas],
        });
     }

  ngOnInit(): void {
   
  }

  doAction() {
    const visita: IVisita = {
      _id:        this.local_data.visitaId,
      bidones:    this.visitaForm.value.bidones,
      kilos:      this.visitaForm.value.kilos,
      entregado:  this.visitaForm.value.entregado,
      nAlbaran:   this.visitaForm.value.nAlbaran,
      notas:      this.visitaForm.value.notas,
      cliente_id: this.local_data.cliente_id,
      ruta_id:    this.local_data.ruta_id,
      fecha:      this.local_data.fecha
    }
    this.dialogRef.close({ event: this.action, data: visita });
  }

  closeDialog( ) {
    this.dialogRef.close({ event: 'Cancel' });
  }

}
