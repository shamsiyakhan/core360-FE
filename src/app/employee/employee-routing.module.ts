import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpComponent } from './emp/emp.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TeamsComponent } from './teams/teams.component';
import { TaskComponent } from './task/task.component';
import { InventoryComponent } from './inventory/inventory.component';
import { MessagingComponent } from '../messaging/messaging.component';

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
    },
    {
      path:"task",
      component:TaskComponent
    },
    {
      path:"inventory",
      component:InventoryComponent
    },
    {
      path:'messages',
      component:MessagingComponent
    }
  ]

  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
