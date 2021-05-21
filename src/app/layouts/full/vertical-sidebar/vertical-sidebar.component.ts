import {
  ChangeDetectorRef,
  Component,
  OnDestroy
} from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { MediaMatcher } from '@angular/cdk/layout';


import { MenuItems } from '../../../shared/menu-items/menu-items';
import { LoginService } from 'src/app/providers/auth/login.service';
import { IUsuario } from 'src/app/interfaces/usuario';
import { Subscription } from 'rxjs';
import { UsuarioService } from 'src/app/providers/usuarios/usuario.service';

@Component({
  selector: 'app-vertical-sidebar',
  templateUrl: './vertical-sidebar.component.html',
  styleUrls: []
})

export class VerticalAppSidebarComponent implements OnDestroy {
  public config: PerfectScrollbarConfigInterface = {};
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;
  status = true;

  itemSelect: number[] = [];
  parentIndex = 0;
  childIndex = 0;

  setClickedRow(i: number, j: number) {
    this.parentIndex = i;
    this.childIndex = j;
  }
  subclickEvent() {
    this.status = true;
  }
  scrollToTop() {
    document.querySelector('.page-wrapper')?.scroll({
      top: 0,
      left: 0
    });
  }

  usuario: IUsuario = { nombre: '', password: '', email: '', role: '', avatar: ''};
  usuarioEventSubscription: Subscription;

  constructor(
    private loginService: LoginService,
    private usuarioService: UsuarioService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public menuItems: MenuItems
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    // tslint:disable-next-line: deprecation
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.usuarioService.retrieveUsuario();
    this.usuarioEventSubscription = this.usuarioService.userEvents
      .subscribe(
        user => {
          if (user) {
            const obj = JSON.parse(user);
            this.usuario = {
              nombre: obj.nombre,
              password: obj.password,
              email: obj.email,
              role: obj.role,
              avatar: obj.avatar
            };

          } else {
            console.log('NO HAY USER');
          }
        }
      )
  }

  salir() {
    this.loginService.logout();
  }

  ngOnDestroy(): void {
    // tslint:disable-next-line: deprecation
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.usuarioEventSubscription.unsubscribe();
  }
}
