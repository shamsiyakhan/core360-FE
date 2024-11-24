import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { ApirtcService } from 'src/app/apirtc.service';
import { ProfileComponent } from 'src/app/profile/profile.component';
import { ReportIssueComponent } from 'src/app/report-issue/report-issue.component';

@Component({
  selector: 'app-emp',
  templateUrl: './emp.component.html',
  styleUrls: ['./emp.component.scss']
})
export class EmpComponent {
  profile=false
  currentRoute: string = '';
  showMsgIcon=false
  constructor(
    private route:Router,
    private dialog:MatDialog,
    private apirtc:ApirtcService
  ){
    apirtc.newMessage.subscribe(()=>{
      if(!route.url.includes('/messages')){
        this.showMsgIcon=true
      }
    })
  }

  ngOnInit(): void {
    // Subscribe to router events to detect the current route
    this.route.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Set the currentRoute to the active URL
        this.currentRoute = event.urlAfterRedirects;
        console.warn
      }
    });
  }

teams()
{
  this.route.navigate(['employee/teams'])
}

dashboard(){
  this.route.navigate(['employee/dashboard'])
}

tasks(){
  this.route.navigate(['employee/task'])
}

isRouteActive(route: string): boolean {
  if(this.route.url.includes(route)){
    return true
  }else{
    return false
  }
}

toggleProfile(){
   
  this.profile=!this.profile
}

inventory(){
  this.route.navigate(['employee/inventory'])
}

logout(){
  localStorage.clear()
  this.route.navigate(['auth' , 'login'])
}

profileInfo(){
  console.warn("profile opened")
  this.dialog.open(ProfileComponent , {
    width:"500px"
  })
}

message(){
  this.showMsgIcon=false
  this.route.navigate(['employee','messages'])
}

report(){
  this.dialog.open(ReportIssueComponent , {
    width:"500px"
  })
}
}
