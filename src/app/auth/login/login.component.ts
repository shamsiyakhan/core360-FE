import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(
    private fareehahttp:HttpClient, 
    private fb:FormBuilder,
    private router:Router
  ){

  }
  loginform=this.fb.group({
    email:'', password:''
  })
login()
{
  const encrypt=window.btoa(String(this.loginform.controls['password'].value))
  this.loginform.patchValue({
    password:encrypt
  })
  console.warn("function called")
  this.fareehahttp.post("http://localhost:3000/login", this.loginform.value).subscribe((dta:any)=>{
    console.warn(dta)
    if(dta.data){
      this.loginform.reset()
      Swal.fire({
        title: 'Success!',
        text: 'Login Successful',
        icon: 'success',
        confirmButtonText: 'OK'
      });
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
        text: 'Invalid Credential',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
    }
  })
}
}
