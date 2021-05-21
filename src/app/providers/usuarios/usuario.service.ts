import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUsuario } from 'src/app/interfaces/usuario';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  userEvents = new BehaviorSubject<any>(undefined);

  constructor( private http: HttpClient ) { }

  getUsuario ( id: number ) {
    const url = `${environment.base_url}/usuarios/${id}`;
    return this.http.get(url);
  }

  getUsuarios() {
    const url = `${environment.base_url}/usuarios`;
    return this.http.get(url)
      .pipe(
        map( (res: any) => res['payload'])
      );
  }

  crearUsuario( usuario: IUsuario) {

  }

  updateUsuario( usuario: IUsuario ) {

  }

  deleteUsuario( id: number ){
    const url = `${environment.base_url}/usuarios/${id}`;
    return this.http.delete(url);
  }

  retrieveUsuario() {
    const usuario =  localStorage.getItem('gausem-currentuser')   || null;
    this.userEvents.next(usuario);
  }
}
