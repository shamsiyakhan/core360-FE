import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path:'auth',
    loadChildren:()=>import('./auth/auth.module').then(auth=>auth.AuthModule)
  },
  {
    path:'owner',
    loadChildren:()=>import('./owner/owner.module').then(auth=>auth.OwnerModule)
  }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
