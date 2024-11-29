import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
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
  allTaskCopy:any
  tasks: string[] = ['All Tasks', 'Today', 'Tomorrow', 'This Week', 'This Month', 'Open', 'In Progress', 'Past Due'];
  selectedTask: string | null = null;
  displayedColumns: string[] = ['name', 'email', 'message', 'deadline' , 'action'];
  dataSource = [];
  highlightTask(task: string): void {
    this.selectedTask = task;
    console.warn(task)
    if(this.selectedTask=="All Tasks"){
      this.allTasks()
    }else if(this.selectedTask=="Today"){
      this.todayTasks()
    }else if(this.selectedTask=="Tomorrow"){
      this.tomorrowTasks()
    }else if(this.selectedTask=="This Week"){
      this.weekTasks()
    }else if(this.selectedTask=="This Month"){
      this.monthsTasks()
    }else if(this.selectedTask=="Open"){
      this.openTasks()
    }else if(this.selectedTask=="In Progress"){
      this.inProgressTasks()
    }else if(this.selectedTask=="Past Due"){
      this.pastDueTasks()
    }
  }

  allTasks(){
    this.allTask=this.allTaskCopy
  }

  getRequests(){
    this.http.get(`http://localhost:3000/getMyRequest/${localStorage.getItem('userid')}`).subscribe((res:any)=>{
      console.warn(res)
    })
  }

  onTabChange(event:any){
    console.warn(event.index)

    if(event.index==0){
      this.getAllTasks()
    }else if(event.index==1){
      this.getAllTasksAssignedbyMe()
    }else if(event.index==2){
      this.request()
    }
  }

  request(){
    this.http.get(`http://localhost:3000/getMyRequest/${localStorage.getItem('userid')}`).subscribe((res:any)=>{
      console.warn(res)
      this.dataSource=res?.data
    })
  }

  approved(data:any){
    console.warn(data)
    this.http.post(`http://localhost:3000/approveRequest/${data.requestId}` , {deadline:data.deadline , taskid:data.taskId}).subscribe((res:any)=>{
      console.warn(res)
      if(res.data){
        Swal.fire({
          text:"Approved",
          confirmButtonText:"Ok",
          icon:"success"
        })

        this.request()
      }else if(res.error){
        Swal.fire({
          text:"Error",
          confirmButtonText:"Ok",
          icon:"error"
        })

        this.request()
      }
    })
  }

  decline(data:any){
    console.warn(data)
    this.http.post(`http://localhost:3000/declineRequest/${data.requestId}` , {deadline:data.deadline , taskid:data.taskId}).subscribe((res:any)=>{
      console.warn(res)
      if(res.data){
        Swal.fire({
          text:"Request Declined Successfully",
          confirmButtonText:"Ok",
          icon:"success"
        })

        this.request()
      }else if(res.error){
        Swal.fire({
          text:"Error",
          confirmButtonText:"Ok",
          icon:"error"
        })

        this.request()
      }
    })
  }

  todayTasks(){
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0)); // Set time to 00:00:00
    const endOfDay = new Date(today.setHours(23, 59, 59, 999)); // Set time to 23:59:59

    this.allTask = this.allTaskCopy.filter((task:any) => {
      const taskDate = new Date(task.deadline);
      return taskDate >= startOfDay && taskDate <= endOfDay;
    });
  }

  tomorrowTasks(){
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to midnight to compare the date only
    const tomorrowStart = new Date(today);
    tomorrowStart.setDate(today.getDate() + 1); // Set date to tomorrow
    const tomorrowEnd = new Date(tomorrowStart);
    tomorrowEnd.setHours(23, 59, 59, 999); // Set time to the end of the day tomorrow

    this.allTask = this.allTaskCopy.filter((task:any) => {
      const taskDate = new Date(task.deadline);
      return taskDate >= tomorrowStart && taskDate <= tomorrowEnd;
    });
  
  }

  openTasks(){
    this.allTask = this.allTaskCopy.filter((task:any) => task.taskStatus == 'Open');
  }

  inProgressTasks(){
    this.allTask = this.allTaskCopy.filter((task:any) => task.taskStatus === 'In Progress');
  }
  pastDueTasks(){
    this.allTask = this.allTaskCopy.filter((task:any) => task.taskStatus == 'Past Due');
  }

  weekTasks(){
    const today = new Date();
    const firstDayOfWeek = today.getDate() - today.getDay(); // Get the first day of the current week (Sunday)
    const startOfWeek = new Date(today.setDate(firstDayOfWeek)); // Set the date to Sunday at midnight
    startOfWeek.setHours(0, 0, 0, 0); // Set time to the start of the day (midnight)

    const endOfWeek = new Date(startOfWeek); // Copy start of the week
    endOfWeek.setDate(startOfWeek.getDate() + 6); // Set it to Saturday
    endOfWeek.setHours(23, 59, 59, 999); // Set time to the end of the day (11:59:59.999 PM)

    this.allTask = this.allTaskCopy.filter((task:any) => {
      const taskDate = new Date(task.deadline);
      return taskDate >= startOfWeek && taskDate <= endOfWeek;
    });
  }

  monthsTasks(){
    const today = new Date();

    // Get the start of the current month
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1); // First day of the current month
    startOfMonth.setHours(0, 0, 0, 0); // Set time to the start of the day (midnight)

    // Get the end of the current month
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0); // Last day of the current month
    endOfMonth.setHours(23, 59, 59, 999); // Set time to the end of the day (11:59:59.999 PM)

    this.allTask = this.allTaskCopy.filter((task:any) => {
      const taskDate = new Date(task.deadline);
      return taskDate >= startOfMonth && taskDate <= endOfMonth;
    });
  }
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
    this.getRequests()
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
    const userid=localStorage.getItem('userid')
    this.http.get(`http://localhost:3000/getTask/${userid}`).subscribe((res:any)=>{
      console.warn(res)
      this.allTaskCopy=res.data
      this.allTask=res.data
    })
  }

  getAllTasksAssignedbyMe(){
    console.warn("get task called")
    const userid=localStorage.getItem('userid')
    this.http.get(`http://localhost:3000/getTasks/${userid}`).subscribe((res:any)=>{
      console.warn(res)
      this.allTaskCopy=res?.data
      this.allTask=res?.data
      console.warn(this.allTask)
    })
  }

  getOrganizationPeople() {
    this.http.get('http://localhost:3000/getorgPeople/' + localStorage.getItem('orgId')).subscribe((resp: any) => {
      console.warn(resp)
      this.orgMembers=resp
    })
  }

  searchTasks(searchTerm: string): void {
    if (searchTerm.trim() === '') {
      // If the input is empty, reset allTask to the original list.
      this.allTask = [...this.allTaskCopy];
    } else {
      // Filter allTaskCopy based on taskName and store in allTask.
      this.allTask = this.allTaskCopy.filter((task:any) =>
        task.taskName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }




  /* Tasks */
  startTask(taskId:any){
    this.http.post(`http://localhost:3000/start-task/${taskId}` , "").subscribe((resp:any)=>{
      if(resp.data){
        this.getAllTasks()
      }else{
        Swal.fire({
          text:"Error To Start Task",
          icon:"error",
          confirmButtonText:"Ok"
        })
      }
    })
  }

  stoptask(taskId:any){
    this.http.post(`http://localhost:3000/end-task/${taskId}`,"").subscribe((resp:any)=>{
      if(resp.data){
        this.getAllTasks()
      }else{
        Swal.fire({
          text:"Error To Pause Task",
          icon:"error",
          confirmButtonText:"Ok"
        })
      }
    })
  }


  completetask(taskId:any){
    this.http.post(`http://localhost:3000/completeTask/${taskId}`,"").subscribe((resp:any)=>{
      if(resp.data){
        this.getAllTasks()
      }else{
        Swal.fire({
          text:"Error To Complete Task",
          icon:"error",
          confirmButtonText:"Ok"
        })
      }
    })
  }
}
