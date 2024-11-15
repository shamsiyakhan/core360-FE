import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-report-issue',
  templateUrl: './report-issue.component.html',
  styleUrls: ['./report-issue.component.scss']
})
export class ReportIssueComponent implements OnInit{
  reportForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http:HttpClient,
    private dialogRef:MatDialogRef<ReportIssueComponent>
  ) {
    // Initialize the form group with FormBuilder
    this.reportForm = this.fb.group({
      report_title: ['', [Validators.required, Validators.minLength(3)]],
      report_content: ['', [Validators.required, Validators.minLength(10)]],
      reported_by:['']
    });
  }
  ngOnInit(): void {
    this.reportForm.patchValue({
      reported_by:localStorage.getItem('userid')
    })
  }

  onSubmit() {
    if (this.reportForm.valid) {
      console.log('Form Data:', this.reportForm.value);
      alert('Report submitted successfully!');
      // You can add logic to send the data to a backend service here.
    } else {
      alert('Please fill in all fields correctly before submitting.');
    }
  }

  reportIssue(){
    this.http.post('http://localhost:3000/reportIssue' , this.reportForm.value).subscribe((res:any)=>{
      if(res.data){
        Swal.fire({
          text:res.data,
          icon:"success",
          confirmButtonText:"ok"
        })
        this.dialogRef.close()
      }else if(res.error){
        Swal.fire({
          text:res.error,
          icon:"error",
          confirmButtonText:"ok"
        })
        this.dialogRef.close()
      }
    })
  }
}
