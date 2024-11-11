import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { CategoryComponent } from '../category/category.component';

@Component({
  selector: 'app-update-inventory',
  templateUrl: './update-inventory.component.html',
  styleUrls: ['./update-inventory.component.scss']
})
export class UpdateInventoryComponent implements OnInit{
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
    @Inject(MAT_DIALOG_DATA) public data:any,
    private http:HttpClient
  ){

  }
  ngOnInit(): void {
    this.getCategories()
    this.addInventory.patchValue(this.data)
  }

  close(){
    this.dialogRef.close()
  }
  
  updateInventories(){
    const orgid=localStorage.getItem('orgId')
    this.http.post(`http://localhost:3000/updateInventory/${this.data.inventid}` , this.addInventory.value).subscribe((res:any)=>{
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

  DeleteInventories() {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you really want to delete this inventory?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete(`http://localhost:3000/deleteInventory/${this.data.inventid}`).subscribe((res: any) => {
          if (res.data) {
            Swal.fire({
              text: "Inventory Deleted",
              icon: "success",
              confirmButtonText: "Ok"
            });
            this.dialogRef.close();
          } else {
            Swal.fire({
              text: "Inventory deletion operation failed",
              icon: "error",
              confirmButtonText: "Ok"
            });
          }
        });
      }
    });
  }
  

  getCategories(){
    const orgId=localStorage.getItem('orgId')
    this.http.get(`http://localhost:3000/categories/${orgId}`).subscribe((res:any)=>{
      console.warn(res)
      this.categories=res.data
    })
  }
}
