import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthComponent } from './auth/auth.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { AdminLoginComponent } from './admin-login/admin-login.component'

@NgModule({
  declarations: [
    ForgotPasswordComponent,
    AuthComponent,
    LoginComponent,
    SignupComponent,
    RegisterUserComponent,
    AdminLoginComponent
    
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ]
})
export class AuthModule {



  constructor(){
    console.warn('auth module')
  }
 }
