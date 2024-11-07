import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-emp',
  templateUrl: './emp.component.html',
  styleUrls: ['./emp.component.scss']
})
export class EmpComponent {

  currentRoute: string = '';
  constructor(private route:Router){}

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

isRouteActive(route: string): boolean {
  if(this.route.url.includes(route)){
    return true
  }else{
    return false
  }
}
}
