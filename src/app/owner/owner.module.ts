import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OwnerRoutingModule } from './owner-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OwnerComponent } from './owner/owner.component';
import {MatSelectModule} from '@angular/material/select';
import { TeamMemberComponent } from './team-member/team-member.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { TasksComponent } from './tasks/tasks.component';
@NgModule({
  declarations: [
    DashboardComponent,
    OwnerComponent,
    TeamMemberComponent,
    TasksComponent
  ],
  imports: [
    CommonModule,
    OwnerRoutingModule,
    MatSelectModule,
    MatTabsModule,
    MatTableModule,
    ReactiveFormsModule
  ]
})
export class OwnerModule { }
