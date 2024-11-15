import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import Swal from 'sweetalert2';
import { ShowMembersComponent } from '../show-members/show-members.component';

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.scss']
})
export class OrganizationsComponent implements OnInit {
  displayedColumns: string[] = ['orgname', 'orgaddress', 'orgmail', 'orgnumber' , 'action'];


  dataSource = [];
  selectedTab = 0
  addmember: any
  orgMembers:any
  add = false
  role = [
    {
      value: 103, name: "Employee"
    },
    {
      value: 102, name: "Manager"
    }
  ]
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private dialog:MatDialog
  ) {


  }
  ngOnInit(): void {

    this.getOrganization()
   
  }



  addTeams = this.fb.group({
    teamname: ['', Validators.required],
    teaminfo: ['', Validators.required],
    teammembers: ['', Validators.required],
    userid:[''],
    orgid:['']
  })


  getOrganization() {
    this.http.get('http://localhost:3000/get-all-organization' ).subscribe((resp: any) => {
      console.warn(resp)
      this.dataSource = resp.data
    })
  }

  Restrictorganization(orgId:any){
    Swal.fire({
      title: 'Are you sure to Restrict organization? Members of organization will not be able to login',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Restrict it!'
    }).then((result) => {
      if (result.isConfirmed) {
        // If confirmed, make the HTTP request to delete the team
        this.http.post('http://localhost:3000/restrict-organization/'+orgId , "").subscribe((resp:any)=>{
          if(resp.data){
            Swal.fire({
              title: 'Success',
              text: 'Restricted Succesfully',
              icon: 'success',
              confirmButtonText: 'OK'
            });
            this.getOrganization()
          }
        })
      }
    });
  }

 

  unRestrictorganization(orgId:any){
    Swal.fire({
      title: 'Are you sure to Remove Restriction of  organization?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Remove Restriction!'
    }).then((result) => {
      if (result.isConfirmed) {
        // If confirmed, make the HTTP request to delete the team
        this.http.post('http://localhost:3000/remove-restrict-organization/'+orgId , "").subscribe((resp:any)=>{
          if(resp.data){
            Swal.fire({
              title: 'Success',
              text: 'Restriction Removed Succesfully',
              icon: 'success',
              confirmButtonText: 'OK'
            });
            this.getOrganization()
          }
        })
      }
    });
  }

  getMembers(orgId:any){
    this.http.get('http://localhost:3000/getorgPeople/'+orgId).subscribe((res:any)=>{
      console.warn(res)
    })

    this.dialog.open(ShowMembersComponent , {
      width:"1000px",
      data:orgId
    })
  }
  
 

  deleteTeam(teamid:any){
    
    Swal.fire({
      title: 'Are you sure to delete team?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        // If confirmed, make the HTTP request to delete the team
        this.http.delete('http://localhost:3000/Teams/'+teamid).subscribe((resp:any)=>{
          if(resp.data){
            Swal.fire({
              title: 'Success',
              text: 'Deleted Succesfully',
              icon: 'success',
              confirmButtonText: 'OK'
            });
           
          }
        })
      }
    });
  }




}