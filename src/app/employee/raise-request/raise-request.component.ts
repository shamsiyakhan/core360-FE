import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-raise-request',
  templateUrl: './raise-request.component.html',
  styleUrls: ['./raise-request.component.scss']
})
export class RaiseRequestComponent {
  deadlineForm!: FormGroup;
  constructor(
    private dialogRef:MatDialogRef<RaiseRequestComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private fb: FormBuilder,
    private http:HttpClient
  ){
      console.warn(data)
  }

  ngOnInit(): void {
    this.deadlineForm = this.fb.group({
      msg: ['', Validators.required],
      deadline: ['', Validators.required],
    });
  }

  get f() {
    return this.deadlineForm.controls;
  }

  onSubmit(): void {
    if (this.deadlineForm.valid) {
      const { msg, deadline } = this.deadlineForm.value;
      console.log('Data:', { msg, deadline });
      const data={
        msg , deadline 
      }
      this.http.post(`http://localhost:3000/raiserequest/${this.data}` ,{ msg, deadline } ).subscribe((res:any)=>{
        if(res.data){
          Swal.fire({
            text:res.data,
            icon:"success",
            confirmButtonText:"ok"
          })
          this.dialogRef.close()
        }else{
          Swal.fire({
            text:res?.error,
            icon:"error",
            confirmButtonText:"ok"
          })
          this.dialogRef.close()
        }
      })
      
    }
  }
}
