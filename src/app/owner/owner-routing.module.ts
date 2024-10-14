import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OwnerComponent } from './owner/owner.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TeamMemberComponent } from './team-member/team-member.component';

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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OwnerRoutingModule { }
