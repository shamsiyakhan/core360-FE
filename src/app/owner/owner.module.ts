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
import { UpdateInventoryComponent } from './update-inventory/update-inventory.component';
import { AddInventoryComponent } from './add-inventory/add-inventory.component';
import { CategoryComponent } from './category/category.component';
import { InventoryComponent } from './inventory/inventory.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MarketingComponent } from './marketing/marketing.component';
import { AddmarketingComponent } from './addmarketing/addmarketing.component';
import { MarketingInfoComponent } from './marketing-info/marketing-info.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
@NgModule({
  declarations: [
    DashboardComponent,
    OwnerComponent,
    TeamMemberComponent,
    TasksComponent,
    UpdateInventoryComponent,
    AddInventoryComponent,
    CategoryComponent,
    InventoryComponent,
    MarketingComponent,
    AddmarketingComponent,
    MarketingInfoComponent,
    UpdateProfileComponent
  ],
  imports: [
    CommonModule,
    OwnerRoutingModule,
    MatSelectModule,
    MatTabsModule,
    MatTableModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule
  ]
})
export class OwnerModule { }
