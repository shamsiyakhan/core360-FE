import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';

 
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpFormGroup=this.fb.group({
    organization_name:[''],
    organization_email:[''],
    organization_phone_no:[''],
    organization_address:[''],
    username:[''],
    email:[''],
    password:[''],
    phone_no:[''],
    address:[''],
    gender:[''],
    dob:[''],
    role:[]
  })
  constructor(
    private fb:FormBuilder,
    private http:HttpClient
  ){
      http.get('http://localhost:3000/').subscribe(d=>{
        console.warn(d)
      })
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  forgotform=this.fb.group({
      email:['']
  })

  signUp(a:any){
    this.http.post('http://localhost:3000/signup' , this.signUpFormGroup.value).subscribe((response:any)=>{
      if(response.data){
        Swal.fire({
          title: 'Success!',
          text: 'Account Created Successfully',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
      }else{
        Swal.fire({
          title: 'Failure!',
          text: 'Account Creation Failed',
          icon: 'warning',
          confirmButtonText: 'Ok'
        });
      }
    })
  }

}
