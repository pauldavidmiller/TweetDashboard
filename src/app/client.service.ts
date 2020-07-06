import { Injectable } from '@angular/core';
//import { of as observableOf, Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { map } from "rxjs/operators";
import { auth } from "firebase";
import { AngularFireDatabase } from 'angularfire2/database';
//import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestoreCollectionGroup } from "angularfire2/firestore";
import * as firebase from 'firebase';
import { LoginComponent } from './auth/login/login.component';

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

  constructor(private auth: AngularFireAuth, public db: AngularFireDatabase) {
    //let n = this.db.list('clients').valueChanges();
  }

  login() {
    let login = this.auth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(function (result) {
      // The signed-in user info.
      let user = result.user;
      console.log(user.email);
      console.log(user.uid);

      var postData = {
        email: user.email
      };


      // UPDATE WITH KEY
      // https://firebase.google.com/docs/database/web/read-and-write
      //var newPostKey = firebase.database().ref().child('clients').push().key;
      //var updates = {};
      //updates['/clients/' + user.uid + '/'] = postData;
      let info = firebase.database().ref('clients/' + user.uid).update(postData);
      console.log(info);

    }).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
    });


    //this.auth.auth.signInWithEmailAndPassword()
  }

  logout() {
    this.auth.auth.signOut();
  }

  getEmail() {
    return this.auth.auth.currentUser.email;
  }

}