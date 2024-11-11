import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerLayoutComponent } from './manager-layout/manager-layout.component';
import { ManagerDashboardComponent } from './manager-dashboard/manager-dashboard.component';
import { TeamsComponent } from './teams/teams.component';
import { InventoryComponent } from './inventory/inventory.component';
import { TasksComponent } from './tasks/tasks.component';
import { MarketingComponent } from './marketing/marketing.component';

const routes: Routes = [

  {
      path:'',
      component:ManagerLayoutComponent,
      children:[
        {
          path:'dashboard',
          component:ManagerDashboardComponent
        },
        {
          path:'teams',
          component:TeamsComponent
        },
        {
          path:'inventory',
          component:InventoryComponent
        },{
          path:"task",
          component:TasksComponent
        },
        {
          path:"marketing",
          component:MarketingComponent
        }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
