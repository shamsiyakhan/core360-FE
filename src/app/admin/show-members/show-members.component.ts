import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-show-members',
  templateUrl: './show-members.component.html',
  styleUrls: ['./show-members.component.scss']
})
export class ShowMembersComponent implements OnInit{
  users:any
  constructor(
    private http:HttpClient,
    private dialogref:MatDialogRef<ShowMembersComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ){

  }
  ngOnInit(): void {
    this.getMembers(this.data)
  }

  getMembers(orgId:any){
    this.http.get('http://localhost:3000/getorgPeople/'+orgId).subscribe((res:any)=>{
      console.warn(res)
      this.users=res
    })
  }

  getRoleType(roleid: number): string {
    switch (roleid) {
      case 101:
        return 'Owner';
      case 102:
        return 'Manager';
      case 103:
        return 'Employee';
      default:
        return 'Unknown';
    }
  }

}
