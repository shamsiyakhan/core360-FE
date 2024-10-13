import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmpComponent } from './emp/emp.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    EmpComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    MatSelectModule
  ]
})
export class EmployeeModule { }
