import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  tasksList:any
  time=[
    {
      value:'Today'
    },
    {
      value:'Last 24 hours'
    },
    {
      value:'Last 7 days'
    },
    {
      value:'Last 30 days'
    },
    {
      value:'All Time'
    },
   
  
  ]

  totalTask = 0;
  unfinished = 0;
  ongoing = 0;
  emergency = 0;
  pastDue = 0;
  totalHours = 0;
  totalhrs=0
  constructor(
    private http:HttpClient
  ){

  }
  ngOnInit(): void {
    this.getAllTasks()
  }

  getAllTasks(){
    console.warn("get task called")
    const userid=localStorage.getItem('userid')
    this.http.get(`http://localhost:3000/getTask/${userid}`).subscribe((res:any)=>{
      console.warn(res)
      this.tasksList=res.data
      this.calculateTaskMetrics()
    })
  }

  calculateTaskMetrics(): void {
    const today = new Date().toISOString().split('T')[0]; // Get today's date (YYYY-MM-DD)

    this.tasksList.forEach((task:any) => {
      const hourstracked = parseFloat(task.hourstracked);  // Decimal hours

      // Convert the tracked hours to minutes
      const trackedMinutes = this.convertDecimalToMinutes(hourstracked);
      this.totalHours += trackedMinutes;  // Add to total minutes

      // Check task statuses and deadlines
      if (task.taskStatus === "Open") {
        this.unfinished++;
      }
      if (task.taskStatus === "In Progress") {
        this.ongoing++;
      }
      if (task.deadline.split('T')[0] === today) {
        this.emergency++;
      }
      if (new Date(task.deadline) < new Date(today) && task.taskStatus !== "Completed") {
        this.pastDue++;
      }
    });

    // Convert total minutes to hours and minutes for display
    const totalFullHours = Math.floor(this.totalHours / 60);  // Full hours
    this.totalhrs=totalFullHours
    const remainingMinutes = this.totalHours % 60;  // Remaining minutes

    // Convert total minutes back to decimal hours for display
    const totalDecimalHours = this.convertMinutesToDecimal(this.totalHours);

    console.log({
      totalTask: this.tasksList.length,
      unfinished: this.unfinished,
      ongoing: this.ongoing,
      emergency: this.emergency,
      pastDue: this.pastDue,
      totalFullHours,
      remainingMinutes,
      totalDecimalHours
    });
  }

  convertDecimalToMinutes(decimal: number): number {
    return decimal * 60;  // Convert hours to minutes
  }

  // Function to convert minutes back to decimal hours
  convertMinutesToDecimal(minutes: number): number {
    return minutes / 60;  // Convert minutes back to hours
  }
  }
  
