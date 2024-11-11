import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmpComponent } from './emp/emp.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatSelectModule } from '@angular/material/select';
import { TeamsComponent } from './teams/teams.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskComponent } from './task/task.component';
import { InventoryComponent } from './inventory/inventory.component';
import { CategoryComponent } from './category/category.component';
import { AddInventoryComponent } from './add-inventory/add-inventory.component';
import { UpdateInventoryComponent } from './update-inventory/update-inventory.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    EmpComponent,
    DashboardComponent,
    TeamsComponent,
    TaskComponent,
    InventoryComponent,
    CategoryComponent,
    AddInventoryComponent,
    UpdateInventoryComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    MatSelectModule,
    MatTabsModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule
  ]
})
export class EmployeeModule { }
