import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthComponent } from './auth/auth.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'
@NgModule({
  declarations: [
    ForgotPasswordComponent,
    AuthComponent
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
