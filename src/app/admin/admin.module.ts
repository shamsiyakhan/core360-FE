import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import { AdminComponent } from './admin/admin.component';
import { MatDialogModule } from '@angular/material/dialog';
import { OrganizationsComponent } from './organizations/organizations.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ShowMembersComponent } from './show-members/show-members.component';
import { ReportsComponent } from './reports/reports.component';
import { ReportsReplyComponent } from './reports-reply/reports-reply.component';
import {NgxSimpleTextEditorModule} from 'ngx-simple-text-editor';
@NgModule({
  declarations: [
    DashboardComponent,
    AdminComponent,
    OrganizationsComponent,
    ShowMembersComponent,
    ReportsComponent,
    ReportsReplyComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatTableModule,
    MatTabsModule,
    MatSelectModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSimpleTextEditorModule
  ]
})
export class AdminModule { }
