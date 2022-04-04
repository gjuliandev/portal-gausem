import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as Chartist from 'chartist';
import { ICliente } from 'src/app/interfaces/cliente';
import { ClientesService } from 'src/app/providers/clientes/clientes.service';
import { ClienteDialogComponent } from './cliente-dialog/cliente-dialog.component';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  dataSource = new MatTableDataSource([]);
  displayedColumns = ['logo',  'nombreComercial', 'cif', 'abonado', 'cantidad_abonada', 'periodicidad', 'consumo', 'renovacion_certificado', 'proxima_visita', 'action']
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator = Object.create(null);
  @ViewChild(MatSort, { static: true }) sort: MatSort = Object.create(null);
  isLoaing = true;
  hayDatos = true;

  mostrarTodos = false;

  constructor(private dialog: MatDialog,
              private clienteService: ClientesService,
              private router: Router) { }

  ngOnInit(): void {
    this.findAllClientes();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(term: string = '') {
    this.dataSource.filter = term.trim();
  }

  findAllClientes() {
    this.clienteService.getClientes(!this.mostrarTodos)
    .subscribe( (clientes)=> {
      this.dataSource.data = clientes;
      this.isLoaing =false;
      this.hayDatos = false;
    });
  }

  verDetalles(cliente: ICliente) {
    this.router.navigateByUrl('admin/clientes/'+cliente._id);
  }

  openDialog(action: string, obj: any) {

    obj.action = action; // Añadimos al objeto cliente el campo action (Add, Update, Delete)

    const dialogRef = this.dialog.open(ClienteDialogComponent, {
      data: obj, 
      disableClose: true
    });

    dialogRef.afterClosed()
      .subscribe( result => {

        switch(result.event) {
          case 'Add':
            this.clienteService.crearCliente(result.data)
              .subscribe(res =>  {
                this.isLoaing = true;
                this.findAllClientes()
              });
            break;
          case 'Update':
            this.clienteService.updateCliente(result.data)
              .subscribe(res =>  {
                this.isLoaing = true;
                this.findAllClientes()
              });
            break;
          case 'Delete':
            this.clienteService.deleteCliente(result.data)
              .subscribe(res =>  {
                this.isLoaing = true;
                this.findAllClientes()
              });
            break;
          default:
            break;
        }
      });
  }

  toggleCoompleted( e: any ) {
   
    if (e.checked === true) {
      this.mostrarTodos = true;
      this.findAllClientes();
    } else {
      this.mostrarTodos = false;
      this.findAllClientes();
    }
  }
}
