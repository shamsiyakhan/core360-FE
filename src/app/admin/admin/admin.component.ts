import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProfileComponent } from 'src/app/profile/profile.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
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
    this.router.navigate(['admin' , 'dashboard'])
  }
  marketing(){
    this.router.navigate(['owner' , 'marketing'])
  }

  Organizations(){
    this.router.navigate(['admin' , 'organizations'])
  }

  reports(){
    this.router.navigate(['admin' , 'reports'])
  }

  logout(){
    localStorage.clear()
    this.router.navigate(['auth' , 'login'])
  }
}