import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Mensaje } from '../interfaces/mensaje.interface';

// login
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class ChatserviceService {

  private itemsCollection: AngularFirestoreCollection<Mensaje>;
  public chats: Mensaje[] = [];
  public usuario: any = {};


  constructor( private afs: AngularFirestore, public auth: AngularFireAuth ) {

    this.auth.authState.subscribe( user => {

        console.log('estado del usuario', user);

        if( user === null ) {
          return;
        }
        this.usuario.name = user.displayName;
        this.usuario.uid = user.uid;
        this.usuario.photo = user.photoURL;
    });

  }


  login( proveedor: string ) {
    if( proveedor === 'google'){
      this.auth.signInWithPopup(new auth.GoogleAuthProvider());
    }

    if( proveedor === 'facebook') {
      this.auth.signInWithPopup(new auth.FacebookAuthProvider());
    }

  }//



  logout() {
    this.usuario = {};
    this.auth.signOut();
  }//



  loadMessage() {
    this.itemsCollection = this.afs.collection<Mensaje>('chat', ref => ref.orderBy('date', 'desc').limit(5));

    return this.itemsCollection.valueChanges();

  }//



  addNewMessage( text: string) {

    let mensaje: Mensaje = {
      name: this.usuario.name,
      date: new Date().getTime(),
      message: text,
      uid: this.usuario.uid,
      photo: this.usuario.photo
    }
    return this.itemsCollection.add(mensaje);

  }//

}
