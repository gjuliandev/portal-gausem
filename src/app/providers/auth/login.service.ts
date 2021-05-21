import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { ILogin } from 'src/app/interfaces/login';
import { IUsuario } from 'src/app/interfaces/usuario';
import { environment } from 'src/environments/environment';
import { UsuarioService } from '../usuarios/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor( private http: HttpClient,
               private router: Router,
               private usuariosService: UsuarioService
              ) { }

  authenticate(login: ILogin) {
  const url = `${environment.base_url}/auth/login`;
  return this.http.post(url, login)
            .pipe(
              tap((resp: any) => {
                this.storageLoggedInUser(resp.usuario[0], login.recuerdame);
                this.router.navigateByUrl('/starter');
                this.usuariosService.retrieveUsuario();
              }),
              map ( res => res.usuario[0])
            )
  }

  logout() {
    localStorage.removeItem('gausem-currentuser');
    this.router.navigateByUrl('/auth/login');
  }

  isLogin() {

  }

  storageLoggedInUser(user: any, recuerdame: boolean) {

    const usuario: IUsuario = {
      nombre: user.nombre,
      password: ':-)',
      email:user.email,
      telefono: user.telefono,
      role: user.role,
      avatar: user.img
    }

    localStorage.setItem('gausem-currentuser', JSON.stringify(usuario) );
    if ( recuerdame ) {
      localStorage.setItem('gausem-email', usuario.email );
    } else {
      localStorage.removeItem('gausem-email');
    }


  }
}
