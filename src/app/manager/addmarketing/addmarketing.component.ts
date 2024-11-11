import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addmarketing',
  templateUrl: './addmarketing.component.html',
  styleUrls: ['./addmarketing.component.scss']
})
export class AddmarketingComponent {

  addCategory=this.fb.group({
    campaign_name:['']
  })
  constructor(
    private fb:FormBuilder,
    public dialogRef: MatDialogRef<AddmarketingComponent>,
    private http:HttpClient
  ){

  }

  close(){
    this.dialogRef.close()
  }
  
  addCategories(){
    const orgid=localStorage.getItem('orgId')
    this.http.post(`http://localhost:3000/addCampaign/${orgid}` , this.addCategory.value).subscribe((res:any)=>{
      if(res.data){
        Swal.fire({
          text:"Campaign Added",
          icon:"success",
          confirmButtonText:"Ok"
        })
        this.dialogRef.close()
      }else{
        Swal.fire({
          text:"Campaign Add operation Failed",
          icon:"error",
          confirmButtonText:"Ok"
        })
      }
    })
  }
}
