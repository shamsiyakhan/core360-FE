import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OwnerComponent } from './owner/owner.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TeamMemberComponent } from './team-member/team-member.component';
import { TasksComponent } from './tasks/tasks.component';
import { InventoryComponent } from './inventory/inventory.component';
import { MarketingComponent } from './marketing/marketing.component';
import { MessagingComponent } from '../messaging/messaging.component';

const routes: Routes = [
  {
    path:'',
    component:OwnerComponent,
    children:[
      {
        path:"dashboard",
        component:DashboardComponent
      },{
        path:'team-member',
        component:TeamMemberComponent
      },
      {
        path:"tasks",
        component:TasksComponent
      },
      {
        path:'inventory',
        component:InventoryComponent
      },
      {
        path:"marketing",
        component:MarketingComponent
      },
      {
        path:"messages",
        component:MessagingComponent
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OwnerRoutingModule { }
