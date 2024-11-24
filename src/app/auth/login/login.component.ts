import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApirtcService } from 'src/app/apirtc.service';
import { SessionGuardService } from 'src/app/session-guard.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  passwordVisible: boolean = false;

  constructor(
    private fareehahttp:HttpClient, 
    private fb:FormBuilder,
    private router:Router,
    private apirtc:ApirtcService,
    private http:HttpClient
  ){
    http.get('http://localhost:3000/checkSession').subscribe((res:any)=>{
      if (res.logIn) {
        this.apirtc.registerUser(res.user)
        localStorage.setItem('orgId' , res.user.orgid)
        localStorage.setItem('userid' , res.user.userid)
        if(res.user.roleid==101){
          this.router.navigate(['owner' , 'dashboard'])
        }else if(res.user.roleid==102){
          this.router.navigate(['manager' , 'dashboard'])
        }else if(res.user.roleid==103){
          this.router.navigate(['employee' , 'dashboard'])
        }
      } 
    })
  }
  loginform=this.fb.group({
    email:'', password:''
  })
login()
{
  const password=this.loginform.controls['password'].value
  console.warn(password)
  const encrypt=window.btoa(String(password))


  const data={
    email:this.loginform.controls['email'].value,
    password:encrypt
  }
  console.warn("function called")

  this.fareehahttp.post("http://localhost:3000/login", data).subscribe((dta:any)=>{
    console.warn(dta)
    if(dta.data){
      this.loginform.reset()
      localStorage.setItem("jwt" , dta.data.jwt)
    /*   Swal.fire({
        title: 'Success!',
        text: 'Login Successful',
        icon: 'success',
        confirmButtonText: 'OK'
      }); */
      this.apirtc.registerUser(dta.data)
      localStorage.setItem('orgId' , dta.data.orgid)
      localStorage.setItem('userid' , dta.data.userid)
      if(dta.data.roleid==101){
        this.router.navigate(['owner' , 'dashboard'])
      }else if(dta.data.roleid==102){
        this.router.navigate(['manager' , 'dashboard'])
      }else if(dta.data.roleid==103){
        this.router.navigate(['employee' , 'dashboard'])
      }
    }else{
      Swal.fire({
        title: 'Failure!',
        text: dta.error,
        icon: 'warning',
        confirmButtonText: 'OK'
      });
    }
  })
}
forgot(){
  this.router.navigate(['auth' , 'forgot'])

}

togglePasswordVisibility() {
  this.passwordVisible = !this.passwordVisible;
}
}
