import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {
  id: any
  emailDisable = true
  signUpFormGroup = this.fb.group({
    userid: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    phone_no: ['', Validators.required],
    address: ['', Validators.required],
    gender: ['', Validators.required],
    dob: ['', Validators.required],
    role: ['', Validators.required]
  })
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {
    http.get('http://localhost:3000/').subscribe(d => {
      console.warn(d)
    })
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
    });
    http.post('http://localhost:3000/getUser', { id: this.id }).subscribe((response: any) => {
      console.warn(response)
      this.signUpFormGroup.patchValue(response[0])
      this.signUpFormGroup.patchValue({ userid: this.id })
      if (response[0].status == 'active') {
        Swal.fire({
          title: 'Warning',
          text: 'Onboarding Already Done',
          icon: 'warning',
          confirmButtonText: 'Ok'
        });
        router.navigate(['auth', 'login'])
      }
    })
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  forgotform = this.fb.group({
    email: ['']
  })

  signUp(a: any) {

    const password = this.signUpFormGroup.controls['password'].value
    const encodedPassword = window.btoa(String(password));
    const newFormGroup = this.fb.group({
      ...this.signUpFormGroup.controls,
      password: [encodedPassword, Validators.required], // Change the password field
    });
    this.http.post('http://localhost:3000/update-registration', newFormGroup.value).subscribe((response: any) => {
      if (response.data) {
        Swal.fire({
          title: 'Success!',
          text: 'Onboarding Successfull',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
        this.router.navigate(['auth', 'login'])
      } else {
        Swal.fire({
          title: 'Failure!',
          text: 'Onboarding Failed',
          icon: 'warning',
          confirmButtonText: 'Ok'
        });
      }
    })
  }

}
