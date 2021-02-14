import { Component } from '@angular/core';
import { ChatserviceService } from '../../services/chatservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor( private chat: ChatserviceService) { }



  login( proveedor: string) {

    console.log( proveedor );

    this.chat.login( proveedor );
  }//


}
