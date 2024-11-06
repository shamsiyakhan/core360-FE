import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

 
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpFormGroup=this.fb.group({
    organization_name:['' , Validators.required],
    organization_email:['' , Validators.required],
    organization_phone_no:['' , Validators.required],
    organization_address:['' , Validators.required],
    username:['' , Validators.required],
    email:['' , Validators.required],
    password:['' , Validators.required],
    phone_no:['' , Validators.required],
    address:['' , Validators.required],
    gender:['' , Validators.required],
    dob:['' , Validators.required],
    role:[101]
  })
  constructor(
    private fb:FormBuilder,
    private http:HttpClient,
    private router:Router
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

  encryptpassword()
  {
    console.warn(this.signUpFormGroup.value)
    this.signUpFormGroup.controls['password'].value
    console.warn(this.signUpFormGroup.controls['password'].value)
    
  

    
    this.signUp()
  }


  signUp(a?:any){
console.warn("signup called")
const password=this.signUpFormGroup.controls['password'].value
    const encodedPassword = window.btoa(String(password));
const newFormGroup = this.fb.group({
  ...this.signUpFormGroup.controls,
  password: [encodedPassword, Validators.required], // Change the password field
});

    this.http.post('http://localhost:3000/signup' , newFormGroup.value).subscribe((response:any)=>{
      console.warn(response)
      if(response.data){
        Swal.fire({
          title: 'Success!',
          text: 'Account Created Successfully',
          icon: 'success',
          confirmButtonText: 'Ok'
        }).then(()=>{
          this.router.navigate(['auth' , 'login'])
        });
        
      }else if(response.error){
        Swal.fire({
          title: 'Failure!',
          text: response.error,
          icon: 'warning',
          confirmButtonText: 'Ok'
        });
      }
      
    })
  }

}
