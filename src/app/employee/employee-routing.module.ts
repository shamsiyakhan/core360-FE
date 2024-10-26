import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpComponent } from './emp/emp.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TeamsComponent } from './teams/teams.component';

const routes: Routes = [
  {
    path:'',
    component:EmpComponent,
    children:[ {
      path:'dashboard',
      component:DashboardComponent
    },
    {
      path:'teams',
      component:TeamsComponent
    }
  ]

  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
