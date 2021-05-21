import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
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

  authenticate(login: ILogin, recuerdame: boolean) {
  const url = `${environment.base_url}/auth/login`;
  return this.http.post(url, login)
            .pipe(
              tap((resp: any) => {
                this.storageLoggedInUser(resp.usuario[0], recuerdame);
                this.router.navigateByUrl('/starter');
                this.usuariosService.retrieveUsuario();
              } )
            )
  }

  logout() {
    localStorage.removeItem('gausem-currentuser');
    this.router.navigateByUrl('/login');
  }

  isLogin() {

  }

  storageLoggedInUser(user: any, recuerdame: boolean) {

    const usuario: IUsuario = {
      nombre: user.nombre,
      password: ':-)',
      email:user.email,
      telefono: user.telefono,
      role: user.role
    }

    localStorage.setItem('gausem-currentuser', JSON.stringify(usuario) );
    if ( recuerdame ) {
      localStorage.setItem('gausem-email', usuario.email );
    } else {
      localStorage.removeItem('gausem-email');
    }


  }
}
