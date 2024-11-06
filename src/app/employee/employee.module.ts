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

@NgModule({
  declarations: [
    EmpComponent,
    DashboardComponent,
    TeamsComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    MatSelectModule,
    MatTabsModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EmployeeModule { }
