import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path:'auth',
    loadChildren:()=>import('./auth/auth.module').then(auth=>auth.AuthModule)
  },
  {
    path:'employee',
    loadChildren:()=>import('./employee/employee.module').then(auth=>auth.EmployeeModule)
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
