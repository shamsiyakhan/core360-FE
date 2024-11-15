import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{

  passwordFieldType: string = 'password';
  currentpasswordFieldType:string='password'
  ngOnInit(): void {
    this.getUserInfo()
  }

  getUserInfo(){
    if(!this.router.url.includes('admin')){
      this.http.get('http://localhost:3000/getUserDetails').subscribe((res:any)=>{
        console.warn(res)
        res.data[0].dob = new Date(res.data[0].dob).toISOString().split('T')[0];
        this.userForm.patchValue(res.data[0]);
        this.currentPasswordCopy=res.data[0].password
        this.userForm.get('email')?.disable();
        this.userForm.patchValue({
          password:'',
          currentPasssword:''
        })
  
       
      })
    }else if(this.router.url.includes('admin')){
      
      this.http.get('http://localhost:3000/getAdminDetails').subscribe((res:any)=>{
        console.warn(res)
        res.data[0].dob = new Date(res.data[0].dob).toISOString().split('T')[0];
        this.userForm.patchValue(res.data[0]);
        this.currentPasswordCopy=res.data[0].password
        this.userForm.get('email')?.disable();
        this.userForm.patchValue({
          password:'',
          currentPasssword:''
        })
  
       
      })
    }
    
  }
  togglePasswordVisibility(): void {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  toggleCurrentPasswordVisibility(): void {
    this.currentpasswordFieldType = this.currentpasswordFieldType === 'password' ? 'text' : 'password';
  }



  userForm: FormGroup;
  currentPasswordCopy:any

  constructor(
    private fb: FormBuilder,
    private http:HttpClient,
    private dialogRef:MatDialogRef<ProfileComponent>,
    private router:Router
  ) {
    this.userForm = this.fb.group({
      username: [''],
      email: [''],
      currentPasssword:[''],
      password: [''],
      phonenumber: [''],
      address: [''],
      gender: [''],
      dob:['']
    });
  }

  update(){
    

    if(!this.router.url.includes('admin')){
      var userdata={...this.userForm.value}
      if(!userdata.password){
       userdata.password=this.currentPasswordCopy
       this.http.post('http://localhost:3000/update-user' , this.userForm.value).subscribe((res:any)=>{
         if(res.data){
           Swal.fire({
             text:"User Details Updated Successfully",
             confirmButtonText:"Ok",
             icon:"success"
           })
           this.dialogRef.close()
         }else{
           Swal.fire({
             text:"User Details Update Failed",
             confirmButtonText:"Ok",
             icon:"error"
           })
           this.dialogRef.close()
         }
       })
      }else if(userdata.password){
       userdata.currentPasssword=window.btoa(userdata.currentPasssword)
       if(userdata.currentPasssword==this.currentPasswordCopy){
         userdata.password=window.btoa(userdata.password)
         this.http.post('http://localhost:3000/update-user' , this.userForm.value).subscribe((res:any)=>{
           if(res.data){
             Swal.fire({
               text:"User Details Updated Successfully",
               confirmButtonText:"Ok",
               icon:"success"
             })
             this.dialogRef.close()
           }else{
             Swal.fire({
               text:"User Details Update Failed",
               confirmButtonText:"Ok",
               icon:"error"
             })
             this.dialogRef.close()
           }
         })
       }else{
         this.logout()
         Swal.fire({
           text:"Current Password Mismatch please login again",
           confirmButtonText:"Ok",
           icon:"error"
         })
       }
      }
    }else if(this.router.url.includes('admin')){
      var userdata={...this.userForm.value}
      if(!userdata.password){
       userdata.password=this.currentPasswordCopy
       this.http.post('http://localhost:3000/update-admin' , this.userForm.value).subscribe((res:any)=>{
         if(res.data){
           Swal.fire({
             text:"User Details Updated Successfully",
             confirmButtonText:"Ok",
             icon:"success"
           })
           this.dialogRef.close()
         }else{
           Swal.fire({
             text:"User Details Update Failed",
             confirmButtonText:"Ok",
             icon:"error"
           })
           this.dialogRef.close()
         }
       })
      }else if(userdata.password){
       userdata.currentPasssword=window.btoa(userdata.currentPasssword)
       if(userdata.currentPasssword==this.currentPasswordCopy){
         userdata.password=window.btoa(userdata.password)
         this.http.post('http://localhost:3000/update-admin' , this.userForm.value).subscribe((res:any)=>{
           if(res.data){
             Swal.fire({
               text:"User Details Updated Successfully",
               confirmButtonText:"Ok",
               icon:"success"
             })
             this.dialogRef.close()
           }else{
             Swal.fire({
               text:"User Details Update Failed",
               confirmButtonText:"Ok",
               icon:"error"
             })
             this.dialogRef.close()
           }
         })
       }else{
         this.logout()
         Swal.fire({
           text:"Current Password Mismatch please login again",
           confirmButtonText:"Ok",
           icon:"error"
         })
       }
      }
    }
  
 
  }

  logout(){
    this.dialogRef.close()
    localStorage.clear()
    this.router.navigate(['auth' , 'login'])
  }

  onSubmit(): void {
    /* console.log('Form submitted:', this.userForm.value); */
    // Add code here to send updated data to the backend
  }

}
