import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerModule } from './manager/manager.module';
import { AdminModule } from './admin/admin.module';
import { SessionGuardService } from './session-guard.service';

const routes: Routes = [

  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },

  {
    path:'auth',
    loadChildren:()=>import('./auth/auth.module').then(auth=>auth.AuthModule),
    
  },
  {
    path:'owner',
    loadChildren:()=>import('./owner/owner.module').then(auth=>auth.OwnerModule),
    canLoad: [SessionGuardService]
  },
  {
    path:'employee',
    loadChildren:()=>import('./employee/employee.module').then(auth=>auth.EmployeeModule),
    canLoad: [SessionGuardService]
  }, 
  {
    path:'manager',
    loadChildren:()=>import('./manager/manager.module').then(manager=>ManagerModule),
    canLoad: [SessionGuardService]
  },
  {
    path:'admin',
    loadChildren:()=>import('./admin/admin.module').then(admin=>AdminModule),
    canLoad: [SessionGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
