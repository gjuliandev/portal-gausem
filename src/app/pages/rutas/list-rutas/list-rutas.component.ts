import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationExtras, Router } from '@angular/router';
import { IRuta } from 'src/app/interfaces/ruta';
import { RutasService } from 'src/app/providers/rutas/rutas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-rutas',
  templateUrl: './list-rutas.component.html',
  styleUrls: ['./list-rutas.component.scss']
})
export class ListRutasComponent implements OnInit {

  rutas: Array<IRuta> = [];
  isLoaing = true;
  hayDatos = true;

  constructor(private rutasService: RutasService,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.findAllRutas();
  }

  applyFilter(term: string = '') {

  }

  planificar(action: string, {}) {
    this.router.navigateByUrl('planificacion/planificar');
  }

  findAllRutas() {
    this.rutasService.getRutas()
    .subscribe( (rutas)=> {
      this.rutas = rutas;
      this.isLoaing =false;
      this.hayDatos = false;
    });
  }

  verDetalles(ruta: IRuta) {
    this.router.navigateByUrl('planificacion/rutas/'+ruta._id);
  }

  editarRuta(ruta: IRuta) {
    console.log('RUTA A EDITAR ' + JSON.stringify(ruta));
    const navigationExtras: NavigationExtras = {
      state: {
        fecha: ruta.fecha,
        usuario_id: ruta.usuario_id,
      }
    };
    this.router.navigateByUrl('/planificacion/planificar', navigationExtras);
  }

  eliminarRuta(ruta: IRuta){
    Swal.fire({
      title: 'Eliminar Ruta',
      text: `¿Seguro que desea eliminar la ruta con ID: ${ruta._id}` ,
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed){
        this.rutasService.eliminarRuta( ruta )
          .subscribe( resp => {
              this.snackBar.open('Ruta eliminada correctamente', 'Eliminar Ruta',       { duration: 2000 });
              this.findAllRutas();
          }, (error) => this.snackBar.open('Se ha producido un error', 'Eliminar Ruta', { duration: 2000})
        )};
    });
  }

}
