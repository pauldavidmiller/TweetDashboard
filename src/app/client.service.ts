import { Injectable } from '@angular/core';
import { of as observableOf } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { map } from "rxjs/operators";
import { auth } from "firebase";

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  // uid = observableOf('123');
  uid = this.auth.authState.pipe(
    map(authState => {
      if (!authState){
        return null;
      } else {
        return authState.uid;
      }
    })
  );
  isAdmin = observableOf(true);

  constructor(private auth: AngularFireAuth) { }

  login(){
    this.auth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    //this.auth.auth.signInWithEmailAndPassword()
  }

  logout(){
    this.auth.auth.signOut();
  }

}
