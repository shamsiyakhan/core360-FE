import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { ManagerLayoutComponent } from './manager-layout/manager-layout.component';
import { ManagerDashboardComponent } from './manager-dashboard/manager-dashboard.component';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [
    ManagerLayoutComponent,
    ManagerDashboardComponent
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    MatSelectModule
  ]
})
export class ManagerModule { }
