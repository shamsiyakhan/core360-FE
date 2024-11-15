import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent {
  passwordVisible: boolean = false;
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
  const password=this.loginform.controls['password'].value
  console.warn(password)
  const encrypt=window.btoa(String(password))


  const data={
    email:this.loginform.controls['email'].value,
    password:encrypt
  }
  console.warn("function called")

  this.fareehahttp.post("http://localhost:3000/admin-login", data).subscribe((dta:any)=>{
    console.warn(dta)
    if(dta.data){
      this.loginform.reset()
      localStorage.setItem("jwt" , dta.data.jwt)

      localStorage.setItem('userid' , dta.data.userid)
      this.router.navigate(['/admin' ,'dashboard'])
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
forgot(){
  this.router.navigate(['auth' , 'forgot'])

}

togglePasswordVisibility() {
  this.passwordVisible = !this.passwordVisible;
}
}

