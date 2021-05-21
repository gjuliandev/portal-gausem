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
    return this.http.get(url)
      .pipe(
        map( (res: any) => res['payload'][0])
      );
  }

  getUsuarios() {
    const url = `${environment.base_url}/usuarios`;
    return this.http.get(url)
      .pipe(
        map( (res: any) => res['payload'])
      );
  }

  crearUsuario( usuario: IUsuario) {
    console.log('el nuevo usuario es ' + JSON.stringify(usuario) );
    const url = `${environment.base_url}/usuarios`;
    const newUser = {
      nombre: usuario.nombre,
      email: usuario.email,
      password: usuario.password,
      telefono: usuario.telefono,
      role: usuario.role
    };
    return this.http.post(url, newUser);

  }

  updateUsuario( usuario: IUsuario ) {
    const url = `${environment.base_url}/usuarios/${usuario._id}`;
    const updateUser = {
      nombre: usuario.nombre,
      email: usuario.email,
      telefono: usuario.telefono,
      role: usuario.role
    }
    return this.http.put(url, updateUser);
  }

  deleteUsuario( usuario: IUsuario ){
    const url = `${environment.base_url}/usuarios/${usuario._id}`;
    return this.http.delete(url);
  }

  retrieveUsuario() {
    const usuario =  localStorage.getItem('gausem-currentuser')   || null;
    this.userEvents.next(usuario);
  }
}
