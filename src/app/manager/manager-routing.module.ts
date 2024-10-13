import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerLayoutComponent } from './manager-layout/manager-layout.component';
import { ManagerDashboardComponent } from './manager-dashboard/manager-dashboard.component';

const routes: Routes = [

  {
      path:'',
      component:ManagerLayoutComponent,
      children:[
        {
          path:'dashboard',
          component:ManagerDashboardComponent
        }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
