import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApirtcService } from 'src/app/apirtc.service';
import { ProfileComponent } from 'src/app/profile/profile.component';
import { ReportIssueComponent } from 'src/app/report-issue/report-issue.component';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss']
})
export class OwnerComponent {
  profile=false
  showMsgIcon=false
  constructor(
    private router:Router,
    private dialog:MatDialog,
    private apirtc:ApirtcService
  ){
    apirtc.newMessage.subscribe(()=>{
      if(!router.url.includes('/messages')){
        this.showMsgIcon=true
      }
    })

  }

  teamsmember(){
    this.router.navigate(['owner' , 'team-member'])
  }
  taskList(){
    this.router.navigate(['owner' , 'tasks'])
  }

  toggleProfile(){
   
    this.profile=!this.profile
  }

  profileInfo(){
    console.warn("profile opened")
    this.dialog.open(ProfileComponent , {
      width:"500px"
    })
  }

  inventory(){
    this.router.navigate(['owner' , 'inventory'])
  }

  isRouteActive(route: string): boolean {
    if(this.router.url.includes(route)){
      return true
    }else{
      return false
    }
  }

  dashboard(){
    this.router.navigate(['owner' , 'dashboard'])
  }
  marketing(){
    this.router.navigate(['owner' , 'marketing'])
  }

  report(){
    this.dialog.open(ReportIssueComponent , {
      width:"500px"
    })
  }

  message(){
    this.showMsgIcon=false
    this.router.navigate(['owner' , 'messages'])
  }

  logout(){
    localStorage.clear()
    this.router.navigate(['auth' , 'login'])
  }
}
