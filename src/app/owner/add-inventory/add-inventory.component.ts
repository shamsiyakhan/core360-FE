import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { CategoryComponent } from '../category/category.component';

@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.component.html',
  styleUrls: ['./add-inventory.component.scss']
})
export class AddInventoryComponent implements OnInit{
  categories:any
  addInventory=this.fb.group({
    inventcategory:[''],
    inventname:[''],
    price:[''],
    details:[''],
    stock:['']
  })
  constructor(
    private fb:FormBuilder,
    public dialogRef: MatDialogRef<CategoryComponent>,
    private http:HttpClient
  ){

  }
  ngOnInit(): void {
    this.getCategories()
  }

  close(){
    this.dialogRef.close()
  }
  
  addInventories(){
    const orgid=localStorage.getItem('orgId')
    this.http.post(`http://localhost:3000/addInventory/${orgid}` , this.addInventory.value).subscribe((res:any)=>{
      if(res.data){
        Swal.fire({
          text:"Inventory Added",
          icon:"success",
          confirmButtonText:"Ok"
        })
        this.dialogRef.close()
      }else{
        Swal.fire({
          text:"Inventory Add operation Failed",
          icon:"error",
          confirmButtonText:"Ok"
        })
      }
    })
  }

  getCategories(){
    const orgId=localStorage.getItem('orgId')
    this.http.get(`http://localhost:3000/categories/${orgId}`).subscribe((res:any)=>{
      console.warn(res)
      this.categories=res.data
    })
  }
}
