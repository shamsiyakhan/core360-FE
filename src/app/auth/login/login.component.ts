import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(
    private fareehahttp:HttpClient, 
    private fb:FormBuilder
  ){

  }
  loginform=this.fb.group({
    email:'', password:''
  })
login()
{
  console.warn("function called")
  this.fareehahttp.post("http://localhost:3000/login", this.loginform.value).subscribe((dta:any)=>{
    if(dta.data){
      Swal.fire({
        title: 'Success!',
        text: 'Login Successful',
        icon: 'success',
        confirmButtonText: 'OK'
      });
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
