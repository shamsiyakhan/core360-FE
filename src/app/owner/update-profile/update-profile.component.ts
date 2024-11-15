import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProfileComponent } from 'src/app/profile/profile.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit{

  passwordFieldType: string = 'password';
  constructor(
    private fb: FormBuilder,
    private http:HttpClient,
    private dialogRef:MatDialogRef<ProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
  ) {
    this.userForm = this.fb.group({
      userid:[''],
      username: [''],
      email: [''],
      password: [''],
      phonenumber: [''],
      address: [''],
      gender: [''],
      dob:['']
    });
  }

  ngOnInit(): void {
    this.userForm.patchValue(this.data);
    this.userForm.get('email')?.disable();
    this.userForm.patchValue({
      password:''
    })
  }

  getUserInfo(){
    this.http.get('http://localhost:3000/getUserDetails').subscribe((res:any)=>{
      console.warn(res)
      res.data[0].dob = new Date(res.data[0].dob).toISOString().split('T')[0];
      this.userForm.patchValue(res.data[0]);
      this.userForm.get('email')?.disable();
      this.userForm.patchValue({
        password:''
      })

     
    })
  }
  togglePasswordVisibility(): void {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }



  userForm: FormGroup;

 

  update(){
    let userdata={...this.userForm.value}
    userdata.password=window.btoa(userdata.password)
    this.http.post('http://localhost:3000/update-user-owner' , userdata).subscribe((res:any)=>{
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
  }

  onSubmit(): void {
    console.log('Form submitted:', this.userForm.value);
    // Add code here to send updated data to the backend
  }

}