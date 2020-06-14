import { Injectable } from '@angular/core';
import { of as observableOf, Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { map } from "rxjs/operators";
import { auth } from "firebase";
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestoreCollectionGroup } from "angularfire2/firestore";
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  // uid = observableOf('123');
  uid = this.auth.authState.pipe(
    map(authState => {
      if (!authState) {
        return null;
      } else {
        return authState.uid;
      }
    })
  );

  isAdmin = this.uid.pipe(
    map(uid => {
      if (!uid) {
        return false;
      } else {
        return this.db.object('/clients/' + uid).valueChanges()
      }
    })
  );


  database = firebase.database();
  email;

  constructor(private auth: AngularFireAuth, public db: AngularFireDatabase) { }

  login() {
    let login = this.auth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(function (result) {
      // The signed-in user info.
      var user = result.user;
      this.email = user.email;
      console.log(user.email);

    }).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
    });


    // TODO: Update user info here with this code
      //let info = firebase.database().ref('/clients/' + this.uid).push({email: this.email});
      //console.log(info);

    //this.auth.auth.signInWithEmailAndPassword()
  }

  logout() {
    this.auth.auth.signOut();
  }

}