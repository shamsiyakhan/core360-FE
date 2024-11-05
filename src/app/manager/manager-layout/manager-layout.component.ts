import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager-layout',
  templateUrl: './manager-layout.component.html',
  styleUrls: ['./manager-layout.component.scss']
})
export class ManagerLayoutComponent {
  currentRoute: string = '';
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

}
