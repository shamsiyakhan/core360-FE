import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
@Component({
  selector: 'app-team-member',
  templateUrl: './team-member.component.html',
  styleUrls: ['./team-member.component.scss']
})


export class TeamMemberComponent implements OnInit{
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  displayedColumnsMember: string[] = ['email', 'phonenumber', 'address', 'status'];
  dataSource = ELEMENT_DATA;
  dataSource1:any
addmember:any
add=false
role=[
  {
    value:103 , name:"Employee"
  },
  {
    value:102 , name:"Manager"
  }
]
  constructor(
    private fb:FormBuilder,
    private http:HttpClient
  ){

 
  }
  ngOnInit(): void {
    console.warn(localStorage.getItem('orgId'))
    this.addMember.patchValue({
      orgId:localStorage.getItem('orgId')
    })
    this.getOrganization()
  }

  

  addMember=this.fb.group({
    email:[''],
    roleId:[''], 
    orgId:['']
  });

  getOrganization(){
    this.http.get('http://localhost:3000/getorgPeople/'+localStorage.getItem('orgId')).subscribe((resp:any)=>{
      console.warn(resp)
      this.dataSource1=resp
    })
  }

  addMembers(){
    console.warn(this.addMember.value)
    this.http.post('http://localhost:3000/addManager' , this.addMember.value).subscribe((data:any)=>{
      if(data.data){
        Swal.fire({
          title: 'Success!',
          text: 'Added Successfully',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        this.getOrganization()
      }else{
        Swal.fire({
          title: 'Error',
          text: 'Adding Failed',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    })
  }
  addMembersPage(){
    this.add=true
  }

  close(){
    this.add=false
  }

  
}
