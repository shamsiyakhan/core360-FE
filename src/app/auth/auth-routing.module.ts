import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [


  {
    path: '',
    component:AuthComponent,
    children:
     [{
     
               path: 'forgot',
              component: ForgotPasswordComponent
    }]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }