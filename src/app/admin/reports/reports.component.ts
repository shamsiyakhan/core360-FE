import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ShowMembersComponent } from '../show-members/show-members.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  displayedColumns: string[] = ['report_title', 'report_status', 'reported_on' , 'action'];


  dataSource = [];
  selectedTab = 0
  addmember: any
  orgMembers:any
  add = false
 
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private dialog:MatDialog,
    private router:Router
  ) {


  }
  ngOnInit(): void {

    this.getReports()
   
  }

  getReports() {
    this.http.get('http://localhost:3000/get-all-reports' ).subscribe((resp: any) => {
      console.warn(resp)
      this.dataSource = resp.data
    })
  }

  showReport(id:any){
    this.router.navigate(['admin' ,'report' , id])
  }



}