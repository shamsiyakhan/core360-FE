import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss']
})
export class OwnerComponent {

  constructor(
    private router:Router
  ){}

  teamsmember(){
    this.router.navigate(['owner' , 'team-member'])
  }
}
