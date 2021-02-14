import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ChatserviceService } from './services/chatservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Chatty';
  items: Observable<any[]>;


  constructor( private db: AngularFirestore,
               public _ch: ChatserviceService) {

    this.items = db.collection('chat').valueChanges();
  }//
}
