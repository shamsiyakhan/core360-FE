import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { ManagerLayoutComponent } from './manager-layout/manager-layout.component';
import { ManagerDashboardComponent } from './manager-dashboard/manager-dashboard.component';
import {MatSelectModule} from '@angular/material/select';
import { TeamsComponent } from './teams/teams.component';

@NgModule({
  declarations: [
    ManagerLayoutComponent,
    ManagerDashboardComponent,
    TeamsComponent
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    MatSelectModule
  ]
})
export class ManagerModule { }
