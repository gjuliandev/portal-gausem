import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IRuta } from 'src/app/interfaces/ruta';
import { RutasService } from 'src/app/providers/rutas/rutas.service';

@Component({
  selector: 'app-list-rutas',
  templateUrl: './list-rutas.component.html',
  styleUrls: ['./list-rutas.component.scss']
})
export class ListRutasComponent implements OnInit {

  rutas: Array<IRuta> = [];
  isLoaing = true;
  hayDatos = true;

  constructor(private rutasService: RutasService, private router: Router) { }

  ngOnInit(): void {
    this.findAllRutas();
  }

  applyFilter(term: string = '') {

  }

  openDialog(action: string, {}) {}

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

}
