import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OwnerRoutingModule } from './owner-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OwnerComponent } from './owner/owner.component';
import {MatSelectModule} from '@angular/material/select';
@NgModule({
  declarations: [
    DashboardComponent,
    OwnerComponent
  ],
  imports: [
    CommonModule,
    OwnerRoutingModule,
    MatSelectModule
  ]
})
export class OwnerModule { }
