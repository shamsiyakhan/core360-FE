import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  add = false
  orgMembers:any
  allTask:any
  addTask = this.fb.group({
    taskName: ['', Validators.required],
    assignedBy: ['', Validators.required],
    deadline: ['', Validators.required],
    taskStatus: ['Open', Validators.required],
    hoursTracked: ['0', Validators.required],
    startTime: ['', Validators.required],
    endTime: ['', Validators.required],
    userId: ['', Validators.required],
    orgid: ['', Validators.required],
  })
  constructor(
    private fb: FormBuilder,
    private http:HttpClient
  ) { }
  ngOnInit(): void {
    this.addTask.patchValue({
      assignedBy:localStorage.getItem('userid'),
      orgid:localStorage.getItem('orgId')
    })
    this.getOrganizationPeople()
    this.getAllTasks()
    
  }
  

  addTaskToUser() {
    this.add=true
  }
  close(){
    this.add=false
    this.addTask.reset()
  }

  createTask(){
    console.warn(this.addTask.value)
    this.http.post('http://localhost:3000/addTask' , this.addTask.value).subscribe((resp:any)=>{
      if(resp.data){
        Swal.fire({
          text:"Task Added Successfully",
          icon:'success',
          confirmButtonText: 'Ok'
        })
        this.getAllTasks()
        this.close()
      }else{
        Swal.fire({
          text:"Task Assignment Failed",
          icon:'error',
          confirmButtonText: 'Ok'
        })
      }
    })
  }

  getAllTasks(){
    console.warn("get task called")
    const orgId=localStorage.getItem('orgId')
    this.http.get(`http://localhost:3000/getOrgTask/${orgId}`).subscribe((res:any)=>{
      console.warn(res)
      this.allTask=res.data
    })
  }

  getOrganizationPeople() {
    this.http.get('http://localhost:3000/getorgPeople/' + localStorage.getItem('orgId')).subscribe((resp: any) => {
      console.warn(resp)
      this.orgMembers=resp
    })
  }
}
