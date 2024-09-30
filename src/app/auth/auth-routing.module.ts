import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [


  {
    path: '',
    component: AuthComponent,
    children:
      [
        {
          path: 'forgot',
          component: ForgotPasswordComponent
        },
        {
          path: 'login',
          component: LoginComponent
        },
        {
          path: 'signup',
          component: SignupComponent
        }
      ]



  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }