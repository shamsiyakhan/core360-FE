import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager-layout',
  templateUrl: './manager-layout.component.html',
  styleUrls: ['./manager-layout.component.scss']
})
export class ManagerLayoutComponent {
  currentRoute: string = '';
  profile=false
constructor(private route:Router){}

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

}
