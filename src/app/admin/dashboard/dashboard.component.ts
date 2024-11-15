import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  time=[
    {
      value:'Today'
    },
    {
      value:'Last 24 hours'
    },
    {
      value:'Last 7 days'
    },
    {
      value:'Last 30 days'
    },
    {
      value:'All Time'
    },
   
  
  ]
  }
  