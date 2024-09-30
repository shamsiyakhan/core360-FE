import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder,FormControl} from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  constructor(private fb:FormBuilder,private http:HttpClient){
      http.get('http://localhost:3000/').subscribe(d=>{
        console.warn(d)
      })
  }

  forgotform=this.fb.group({
      email:['']
  })

  forgot(a:any){
    console.warn(a)
  }

}
