import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {

  addCategory=this.fb.group({
    categoryname:['']
  })
  constructor(
    private fb:FormBuilder,
    public dialogRef: MatDialogRef<CategoryComponent>,
    private http:HttpClient
  ){

  }

  close(){
    this.dialogRef.close()
  }
  
  addCategories(){
    const orgid=localStorage.getItem('orgId')
    this.http.post(`http://localhost:3000/addCategory/${orgid}` , this.addCategory.value).subscribe((res:any)=>{
      if(res.data){
        Swal.fire({
          text:"Category Added",
          icon:"success",
          confirmButtonText:"Ok"
        })
        this.dialogRef.close()
      }else{
        Swal.fire({
          text:"Category Add operation Failed",
          icon:"error",
          confirmButtonText:"Ok"
        })
      }
    })
  }
}
