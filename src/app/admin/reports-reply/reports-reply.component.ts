import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {EditorConfig, ST_BUTTONS} from 'ngx-simple-text-editor';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-reports-reply',
  templateUrl: './reports-reply.component.html',
  styleUrls: ['./reports-reply.component.scss']
})
export class ReportsReplyComponent implements OnInit {

  id: any
  report:any
  reportId:any
  content = '';
  config: EditorConfig = {
    placeholder: 'Type something...',
    buttons: ST_BUTTONS,
  };
  constructor(
    private route: ActivatedRoute,
    private http:HttpClient,
    private fb:FormBuilder,
    private router:Router
  ) { }

  resolvedForm=this.fb.group({
    userid:[''],
    reportReply:['']
  })

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');  
    });

    this.getReport()
  
  }

  getReport(){
    this.http.get('http://localhost:3000/getReports/'+this.id).subscribe((res:any)=>{
      console.warn(res)
      this.report=res.data[0]
      this.reportId=res.data[0].report_id
      this.resolvedForm.patchValue({
        userid:res.data[0].reported_by
      })
    })
  }
  formatDate(date: string): string {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
  }

  submitReport(){
    console.warn(this.resolvedForm.value)
    this.http.post('http://localhost:3000/updateReport/'+this.reportId , this.resolvedForm.value).subscribe((res:any)=>{
      if(res.data){
        Swal.fire({
          text:res.data,
          confirmButtonText:"Ok",
          icon:"success"
        })
        this.router.navigate(['admin' , 'reports'])
      }else if(res.error){
        Swal.fire({
          text:res.error,
          confirmButtonText:"Ok",
          icon:"error"
        })
        this.router.navigate(['admin' , 'reports'])
      }
    })
  }
}
