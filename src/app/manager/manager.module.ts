import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { ManagerLayoutComponent } from './manager-layout/manager-layout.component';
import { ManagerDashboardComponent } from './manager-dashboard/manager-dashboard.component';
import {MatSelectModule} from '@angular/material/select';
import { TeamsComponent } from './teams/teams.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import { InventoryComponent } from './inventory/inventory.component';


@NgModule({
  declarations: [
    ManagerLayoutComponent,
    ManagerDashboardComponent,
    TeamsComponent,
    InventoryComponent
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    MatSelectModule,
    MatTabsModule,
    MatTableModule
  ]
})
export class ManagerModule { }
