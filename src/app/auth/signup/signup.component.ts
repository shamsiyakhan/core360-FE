import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private fb:FormBuilder,private http:HttpClient){
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

  forgot(a:any){
    console.warn(a)
  }

}
