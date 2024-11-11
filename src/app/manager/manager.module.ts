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
import { ReactiveFormsModule } from '@angular/forms';
import { TasksComponent } from './tasks/tasks.component';
import { FormsModule } from '@angular/forms';
import { CategoryComponent } from './category/category.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AddInventoryComponent } from './add-inventory/add-inventory.component';
import { UpdateInventoryComponent } from './update-inventory/update-inventory.component';
import { MarketingInfoComponent } from './marketing-info/marketing-info.component';
import { AddmarketingComponent } from './addmarketing/addmarketing.component';
import { MarketingComponent } from './marketing/marketing.component';
@NgModule({
  declarations: [
    ManagerLayoutComponent,
    ManagerDashboardComponent,
    TeamsComponent,
    InventoryComponent,
    TasksComponent,
    CategoryComponent,
    AddInventoryComponent,
    UpdateInventoryComponent,
    MarketingInfoComponent,
    AddmarketingComponent,
    MarketingComponent
  ],
  imports: [
    CommonModule,
    ManagerRoutingModule,
    MatSelectModule,
    MatTabsModule,
    MatTableModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule
  ]
})
export class ManagerModule { }
