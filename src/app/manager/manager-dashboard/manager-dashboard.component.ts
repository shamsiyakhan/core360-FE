import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-manager-dashboard',
  templateUrl: './manager-dashboard.component.html',
  styleUrls: ['./manager-dashboard.component.scss']
})
export class ManagerDashboardComponent {
  campaigns:any
  totalClicks:any
  totalConversion:any
  allTaskCopy:any
  allTask:any
  openTask:any
  Inprogress:any
  passDue:any
  completed:any
    constructor(
      private http:HttpClient
    ){
      this.getCampaigns()

    }

    getCampaigns(){
      const orgId=localStorage.getItem('orgId')
      this.http.get(`http://localhost:3000/getCampaigns/${orgId}`).subscribe((res:any)=>{
        this.campaigns=res.data
        this.totalClicks = this.campaigns.reduce((sum:any, item:any) => sum + item.clicks, 0);
        this.totalConversion=this.campaigns.reduce((sum:any, item:any) => sum + item.conversion, 0);
        console.warn(this.totalClicks)
      })
    }


    getAllTasks(){
      const userid=localStorage.getItem('userid')
      this.http.get(`http://localhost:3000/getTask/${userid}`).subscribe((res:any)=>{
        console.warn(res)
        this.allTaskCopy=res.data
        this.allTask=res.data
      })
    }

    openTasks(){
      this.openTask = this.allTaskCopy.filter((task:any) => task.taskStatus == 'Open');
    }
  
    inProgressTasks(){
      this.Inprogress = this.allTaskCopy.filter((task:any) => task.taskStatus === 'In Progress');
    }
    pastDueTasks(){
      this.passDue = this.allTaskCopy.filter((task:any) => task.taskStatus == 'Past Due');
    }
    completedTasks(){
      this.completed = this.allTaskCopy.filter((task:any) => task.taskStatus == 'Completed');
    }
  

  }
  
