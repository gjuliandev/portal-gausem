import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { UsuarioService } from 'src/app/providers/usuarios/usuario.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  dataSource = new MatTableDataSource([]);
  displayedColumns = ['img', 'nombre', 'email', 'telefono', 'action']

  constructor(private usuarioService: UsuarioService,
              private dialog: MatDialog) { }

  ngOnInit(): void {

    this.usuarioService.getUsuarios()
      .subscribe( usuarios => {
        this.dataSource.data = usuarios;
      });
  }

  applyFilter(term: string) {

  }

  openDialog(action: string, obj: any) {

    obj.action = action; // Añadimos al objeto usuario el campo action (Add, Update, Delete)

    const dialogRef = this.dialog.open(DialogComponent, {data: obj});

    dialogRef.afterClosed()
      .subscribe( result => {
        console.log('Esto es lo que devuelve: ' + JSON.stringify(result));
        switch(result.event) {
          case 'Add':
            this.usuarioService.crearUsuario(result.data)
              .subscribe(res => console.log(res));
            break;
          case 'Update':
            this.usuarioService.updateUsuario(result.data)
              .subscribe(res => console.log(res));
            break;
          case 'Delete':
            this.usuarioService.deleteUsuario(result.data)
              .subscribe(res => console.log(res));
            break;
          default:
            break;
        }
      });
  }

}
