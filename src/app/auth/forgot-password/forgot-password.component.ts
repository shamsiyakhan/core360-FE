import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder,FormControl, Validators} from '@angular/forms';
import { Route, Router } from '@angular/router';
import { HttpApiService } from 'src/app/http-api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  step1=true
  step2=false
  step3=false /* condition */
  constructor(
    private fb:FormBuilder,
    private http:HttpClient, 
    private route:Router,
    private apiService:HttpApiService
  )
  {
      http.get('http://localhost:3000/').subscribe(d=>{
        console.warn(d)
      })
  }

  forgotform=this.fb.group({
      email:['',Validators.required],
      otp:[''],
      password:['']
  })
  

  forgot(a:any){
    console.warn(a)
    this.apiService.postApi('http://localhost:3000/forgot',{email:this.forgotform.get('email')?.value}).subscribe((result:any)=>{
      console.warn(result)

      if(result.error){
        Swal.fire({
          title: 'Error',
          text: 'Cannot Find account',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }else{
        Swal.fire({
          title: 'Success',
          text: 'Otp Send Successfully',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
        this.step1=false
        this.step2=true
      }
    })

  }

  reset(){
      this.apiService.postApi('http://localhost:3000/verifyOtp',{email:this.forgotform.get('email')?.value,otp:this.forgotform.get('otp')?.value}).subscribe((result:any)=>{
        console.warn(result)
        if(result.error){
          Swal.fire({
            title: 'Error',
            text: 'Invalid Otp',
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }else{
          Swal.fire({
            title: 'Success',
            text: 'Otp Verified Successfully',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          this.step1=false
          this.step2=false  
          this.step3=true
        }

      })
     
   
  }
  confirm(){
    const encrpt=window.btoa(String(this.forgotform.get('password')?.value))
    this.apiService.postApi('http://localhost:3000/updatePassword',{password:encrpt,email:this.forgotform.get('email')?.value}).subscribe((result:any)=>{
      console.warn(result)

      if(result.error){
        Swal.fire({
          title: 'Error',
          text: 'Password not updated',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }else{
        Swal.fire({
          title: 'Success',
          text: 'Password Updated',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
      }
    })
    this.step1=false
    this.step2=false
    this.step3=true
}

}
