import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProfileComponent } from 'src/app/profile/profile.component';
import { ReportIssueComponent } from 'src/app/report-issue/report-issue.component';

@Component({
  selector: 'app-manager-layout',
  templateUrl: './manager-layout.component.html',
  styleUrls: ['./manager-layout.component.scss']
})
export class ManagerLayoutComponent {
  currentRoute: string = '';
  profile=false
constructor(
  private route:Router,
  private dialog:MatDialog
){}

team(){
  this.route.navigate(['manager/teams'])

}
inventory(){
  this.route.navigate(['manager/inventory'])
}
isRouteActive(route: string): boolean {
  if(this.route.url.includes(route)){
    return true
  }else{
    return false
  }
}

marketing(){
  this.route.navigate(['manager' , 'marketing'])
}

toggleProfile(){
   
  this.profile=!this.profile
}


tasks(){
  this.route.navigate(['manager/task'])
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

report(){
  this.dialog.open(ReportIssueComponent , {
    width:"500px"
  })
}

}
