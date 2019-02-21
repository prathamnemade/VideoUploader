import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { RegisterService } from './register.service';
import { FetchLoginDataService } from './fetchLoginData.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }
  constructor(private router: Router,private formBuilder: FormBuilder, private loginService: LoginService, private registerService: RegisterService, private fetchLoginDataService: FetchLoginDataService) { }
  onLoginSubmit(data) {
    console.warn("datalogin", data);
    this.fetchLoginDataService.getAllData('/register').subscribe(x => {
      for (let i = 0; i < x.length; i++) {
        if (data.email == x[i].email && data.password == x[i].password) {
          sessionStorage.setItem('userEmail',x[i].email)
          sessionStorage.setItem('userName',x[i].username)
          this.router.navigate(['/dashboard']);
        }
      }
    })

  }
  onRegisterSubmit(data) {
    this.registerService.register(data)
  }
}
