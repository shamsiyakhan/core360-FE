import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder,FormControl, Validators} from '@angular/forms';
import { Route, Router } from '@angular/router';
import { HttpApiService } from 'src/app/http-api.service';

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
    this.apiService.postApi('http://localhost:3000/forgot',{email:this.forgotform.get('email')?.value}).subscribe(result=>{
      console.warn(result)
    })
    this.step1=false
    this.step2=true
  }

  reset(){
      this.apiService.postApi('http://localhost:3000/verifyOtp',{email:this.forgotform.get('email')?.value,otp:this.forgotform.get('otp')?.value}).subscribe(result=>{
        console.warn(result)

      })
     
      this.step1=false
      this.step2=false  
      this.step3=true
  }
  confirm(){
    this.apiService.postApi('http://localhost:3000/updatePassword',{password:this.forgotform.get('password')?.value,email:this.forgotform.get('email')?.value}).subscribe(result=>{
      console.warn(result)
    })
    this.step1=false
    this.step2=false
    this.step3=true
}

}
