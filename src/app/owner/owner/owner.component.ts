import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss']
})
export class OwnerComponent {
  profile=false
  constructor(
    private router:Router
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

  logout(){
    localStorage.clear()
    this.router.navigate(['auth' , 'login'])
  }
}
