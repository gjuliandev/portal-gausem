import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { LoginService } from 'src/app/providers/auth/login.service';
import { ILogin } from 'src/app/interfaces/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup = Object.create(null);
  constructor(private fb: FormBuilder,
              private loginservice: LoginService,
              private router: Router) { }

  email: string = '';
  msg = '';
  error = false;
  recuerdame = false;

  ngOnInit() {
    this.email = localStorage.getItem('gausem-email') || '';

    if (this.email) {
      this.recuerdame = true;
    }

    this.loginForm = this.fb.group({
      email: [this.email, Validators.compose([Validators.required, Validators.email]) ],
      password: [ null, Validators.required ],
      recuerdame: [this.recuerdame, Validators.required]
    });
  }

  check() {

    const login: ILogin = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
      recuerdame: this.loginForm.value.recuerdame
    }

    this.loginservice.authenticate(login)
      .subscribe( user => { } 
        ,error => {
          this.error = true;
          this.msg = error.error.msg;
        });

  }
}
