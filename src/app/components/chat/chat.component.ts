import { Component } from '@angular/core';
import { ChatserviceService } from '../../services/chatservice.service';
import { Mensaje } from '../../interfaces/mensaje.interface';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  mensaje = '';
  chats: Mensaje[] = [];

  constructor( public chat: ChatserviceService) { 
    this.chat.loadMessage().subscribe(
      (mess: any) => {
        console.log(mess);
        this.chats = mess;
      }
    );
  }


  enviar(){

    if ( this.mensaje.length === 0) { return;}

    this.chat.addNewMessage( this.mensaje )
             .then(  () => this.mensaje = '' )
             .catch(  ( error ) => console.log('error en Enviar', error) )

  }
}
