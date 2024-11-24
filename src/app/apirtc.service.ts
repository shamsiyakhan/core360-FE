import { Injectable } from '@angular/core';
import * as apiRTC from '@apirtc/apirtc';
import { BehaviorSubject, Subject } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ApirtcService {
  userAgent= new apiRTC.UserAgent({
    uri:'apzkey:fa6dbd053bfc677fa02f30dd399cdeca'
  })
  session:any
  newMessage = new BehaviorSubject<any>(null);
  messages: { [key: string]: { mssg: string; me: boolean }[] } = {};
  constructor() { }

  registerUser(userdata:any){
    console.warn("register called ")
    console.warn(userdata.userid)
    if(!this.session){
      const data={
        id:userdata.userid,
        username:userdata.username
      }
      this.userAgent.register(data).then((sess:any)=>{
        console.warn(`session is`)
        console.warn(sess)
        this.session=sess
        this.sessionListener()
      })
    }
    
  }

  sessionListener(){
    this.session.on('contactMessage', (value:any) => {
       console.warn(' ************* Session event *************', 'conversationMessage' ) 
       console.warn(value)
       const mssg={
        id:value.sender.id,
        msg:value.content
       }
       this.messageReceived(mssg) 
      });
  }

  async sendMessage(contactId:any , message:String){
    try{
      const destinationContact = this.session.getOrCreateContact(contactId);
      const messageStatus = await destinationContact.sendMessage(message);
      const mssg={
        id:contactId , 
        msg:message
      }
      this.messageSend(mssg)
      this.newMessage.next(this.messages)
    }
    catch(error){
      console.warn(error)
      Swal.fire({
        text:"Unable to send message",
        icon:"error",
        confirmButtonText:"Ok"
      })
    }
      
  }

  messageReceived(mssg: any) {
    console.warn(mssg)
    const userId = mssg.id; // Sender ID
    const messageContent = { mssg: mssg.msg, me: false }; 

    if (!this.messages[userId]) {
      this.messages[userId] = [];
    }

    this.messages[userId].push(messageContent);

    console.log(`Message received from user ${userId}:`, this.messages[userId]);
    console.warn(this.messages)
    this.newMessage.next(this.messages)
  }

  messageSend(mssg: any) {
    const userId = mssg.id; // Sender ID
    const messageContent = { mssg: mssg.msg, me: true }; 

    if (!this.messages[userId]) {
      this.messages[userId] = [];
    }

    this.messages[userId].push(messageContent);

    console.log(`Message sent to user ${userId}:`, this.messages[userId]);
    console.warn(this.messages)
    this.newMessage.next(this.messages)
  }
}
