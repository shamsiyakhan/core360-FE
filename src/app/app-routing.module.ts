import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerModule } from './manager/manager.module';

const routes: Routes = [

  {
    path:'auth',
    loadChildren:()=>import('./auth/auth.module').then(auth=>auth.AuthModule)
  },
  {
    path:'manager',
    loadChildren:()=>import('./manager/manager.module').then(manager=>ManagerModule)
  }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
