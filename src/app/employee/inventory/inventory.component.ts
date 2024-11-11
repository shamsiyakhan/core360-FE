import { Component, OnInit } from '@angular/core';
import { UpdateInventoryComponent } from '../update-inventory/update-inventory.component';
import { AddInventoryComponent } from '../add-inventory/add-inventory.component';
import { CategoryComponent } from '../category/category.component';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  categories:any
  inventory:any[]=[]
  inventoryCopy:any[]=[]
  constructor(
    private http:HttpClient,
    private dialog:MatDialog
  ){
    this.getCategories()
   this.getInventory()
  }
  ngOnInit(): void {
    console.warn(this.inventory.length)
  }

  getCategories(){
    const orgId=localStorage.getItem('orgId')
    this.http.get(`http://localhost:3000/categories/${orgId}`).subscribe((res:any)=>{
      console.warn(res)
      this.categories=res.data
    })
  }

  getInventory(){
    
    const orgId=localStorage.getItem('orgId')
    this.http.get(`http://localhost:3000/getInventory/${orgId}`).subscribe((res:any)=>{
      console.warn(res)
      this.inventoryCopy=res.data
      this.inventory=res.data
    })
  }

  addCategory(){
    const dialogRef=this.dialog.open(CategoryComponent , {
      width:"500px",
      height:"200px"
    })

    dialogRef.afterClosed().subscribe(()=>{
      this.getInventory()
      this.getCategories()
    })
  }

  addInventory(){
    const dialogRef=this.dialog.open(AddInventoryComponent , {
      width:"500px",
      height:"600px"
    })

    dialogRef.afterClosed().subscribe(()=>{
      this.getInventory()
      this.getCategories()
    })
  }

  filterInventory() {
    // Get selected categories
    const selectedCategories = this.categories.filter((category:any) => category.selected).map((category:any) => category.categoryname);
    console.warn(selectedCategories)
    // Filter inventory based on selected categories
    this.inventory = this.inventoryCopy.filter(item => selectedCategories.includes(item.inventcategory));
    if(selectedCategories.length==0){
      this.inventory=this.inventoryCopy
    }
  }

  updateInventory(invent:any){
    const dialogRef=this.dialog.open(UpdateInventoryComponent , {
      width:"500px",
      height:"600px",
      data:invent
    })

    dialogRef.afterClosed().subscribe(()=>{
      this.getInventory()
      this.getCategories()
    })
  }

}
