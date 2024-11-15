import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrganizationsComponent } from './organizations/organizations.component';
import { ReportsComponent } from './reports/reports.component';
import { ReportsReplyComponent } from './reports-reply/reports-reply.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: "dashboard",
        component: DashboardComponent
      },{
        path:"organizations",
        component:OrganizationsComponent
      },
      {
        path:"reports",
        component:ReportsComponent
      },
      {
        path:"report/:id",
        component:ReportsReplyComponent
      }
    ]
  }
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
