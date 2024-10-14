import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OwnerRoutingModule } from './owner-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OwnerComponent } from './owner/owner.component';
import {MatSelectModule} from '@angular/material/select';
import { TeamMemberComponent } from './team-member/team-member.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
@NgModule({
  declarations: [
    DashboardComponent,
    OwnerComponent,
    TeamMemberComponent
  ],
  imports: [
    CommonModule,
    OwnerRoutingModule,
    MatSelectModule,
    MatTabsModule,
    MatTableModule
  ]
})
export class OwnerModule { }
