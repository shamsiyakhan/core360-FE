import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import Swal from 'sweetalert2';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];
@Component({
  selector: 'app-team-member',
  templateUrl: './team-member.component.html',
  styleUrls: ['./team-member.component.scss']
})


export class TeamMemberComponent implements OnInit {
  displayedColumns: string[] = ['teamname', 'teaminfo', 'users', 'action'];

  displayedColumnsMember: string[] = ['email', 'phonenumber', 'address', 'status'];
  dataSource = [];
  dataSource1: any
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
    private http: HttpClient
  ) {


  }
  ngOnInit(): void {
    console.warn(localStorage.getItem('orgId'))
    this.addMember.patchValue({
      orgId: localStorage.getItem('orgId')
    })
    this.getOrganization()
    this.getTeam()
    this.addTeams.patchValue({
      userid:localStorage.getItem('userid'),
      orgid:localStorage.getItem('orgId')
    })
  }

  onTabChange(event: MatTabChangeEvent) {
    console.warn(event.index)
    this.selectedTab = event.index
    if(event.index==1){
      this.getOrganization()
    }
  }



  addMember = this.fb.group({
    email: [''],
    roleId: [''],
    orgId: ['']
  });

  addTeams = this.fb.group({
    teamname: ['', Validators.required],
    teaminfo: ['', Validators.required],
    teammembers: ['', Validators.required],
    userid:[''],
    orgid:['']
  })


  getOrganization() {
    this.http.get('http://localhost:3000/getorgPeople/' + localStorage.getItem('orgId')).subscribe((resp: any) => {
      console.warn(resp)
      this.dataSource1 = resp
      this.orgMembers=resp
    })
  }

  addMembers() {
    console.warn(this.addMember.value)
    this.http.post('http://localhost:3000/addManager', this.addMember.value).subscribe((data: any) => {
      if (data.data) {
        Swal.fire({
          title: 'Success!',
          text: 'Added Successfully',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        this.getOrganization()
        this.close()
      } else {
        Swal.fire({
          title: 'Error',
          text: 'Adding Failed',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    })
  }

  getTeam(){
    const orgid=localStorage.getItem('orgId')
    this.http.get('http://localhost:3000/getTeams/'+orgid).subscribe((resp:any)=>{
      console.warn(resp.data)
      if(resp.data){
        this.dataSource=resp.data
      }else if(resp.error){
        Swal.fire({
          title: 'Error',
          text: resp.error,
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    })

  }

  addTeamToOrganization(){
    console.warn("add team called")
    console.warn(this.addTeams.value)

    console.warn(this.addMember.value)
    this.http.post('http://localhost:3000/addTeams', this.addTeams.value).subscribe((data: any) => {
      if (data.data) {
        Swal.fire({
          title: 'Success!',
          text: data.data,
          icon: 'success',
          confirmButtonText: 'OK'
        });
        this.getTeam()
        this.close()
      } else if(data.error){
        console.warn(data.error)
        Swal.fire({
          title: 'Error',
          text: 'Adding Failed',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    })
  }
  addMembersPage() {
    this.add = true
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
            this.getTeam()
          }
        })
      }
    });
  }

  close() {
    this.add = false
  }


}