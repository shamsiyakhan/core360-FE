import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ApirtcService } from '../apirtc.service';

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.scss']
})
export class MessagingComponent {
  messages: any
  specificMessage: any
  constructor(
    private http: HttpClient,
    private apirtc: ApirtcService
  ) {
    this.getUsersList()
    apirtc.newMessage.subscribe((mssg: any) => {
      console.warn("message updated")
      console.warn(mssg)
      this.messages = mssg
      this.specificMessage = this.messages[this.selectedUser.userid]
    })
  }
  users: any
  selectedUser: any;
  newMessage: string = '';

  selectUser(user: any) {
    this.selectedUser = user;
    this.specificMessage = this.messages[this.selectedUser.userid]
  }


  getUsersList() {
    this.http.get('http://localhost:3000/getorgPeople/' + localStorage.getItem('orgId')).subscribe((res: any) => {
      this.users = res
      let useridToRemove = localStorage.getItem('userid');

      // Remove the user object with the matching userid
      this.users = this.users.filter((user:any) => user.userid !== useridToRemove);

      console.log(this.users);
    })
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      this.apirtc.sendMessage(this.selectedUser.userid, this.newMessage)
      this.newMessage = '';
    }
  }
}
