import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IUsuario } from 'src/app/interfaces/usuario';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent{

  action: string | null = null;
  local_data: any;
  userForm: FormGroup = Object.create(null);

  constructor(public dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public data: IUsuario,
              private fb: FormBuilder) {

    this.local_data = { ...data };
    this.action = this.local_data.action; //Add, Update, Delete
    this.userForm = this.fb.group({
      nombre: [this.local_data.nombre, Validators.required],
      email: [this.local_data.email, Validators.compose([Validators.required, Validators.email]) ],
      password: [this.local_data.password ],
      telefono: [this.local_data.telefono, Validators.required],
      role: [this.local_data.role, Validators.required]
    });



  }

  doAction() {
    const user: IUsuario = {
      _id:      this.local_data._id,
      nombre:   this.userForm.value.nombre,
      email:    this.userForm.value.email,
      password: this.userForm.value.password,
      telefono: this.userForm.value.telefono,
      role:     this.userForm.value.role
    }
    this.dialogRef.close({ event: this.action, data: user });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }

}
