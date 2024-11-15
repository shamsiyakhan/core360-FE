import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProfileComponent } from 'src/app/profile/profile.component';
import { ReportIssueComponent } from 'src/app/report-issue/report-issue.component';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss']
})
export class OwnerComponent {
  profile=false
  constructor(
    private router:Router,
    private dialog:MatDialog
  ){}

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

  logout(){
    localStorage.clear()
    this.router.navigate(['auth' , 'login'])
  }
}
