import { Injectable } from '@angular/core';
//import { of as observableOf, Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { map } from "rxjs/operators";
import { auth } from "firebase";
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
//import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestoreCollectionGroup } from "angularfire2/firestore";

@Injectable({
    providedIn: 'root',
})
export class UserListService {

    database = firebase.database();

    constructor(private auth: AngularFireAuth, public db: AngularFireDatabase) {
        //let n = this.db.list('clients').valueChanges();
    }

    getUsers() {

        // Try catch block to check uid is logged in - if no login give clean slate for playground
        try {
            let uid = this.auth.auth.currentUser.uid;
            console.log("UserlistService: " + uid);

            var list: Array<string> = [];
            var ref = firebase.database().ref().child('/clients/' + uid + '/users/').orderByChild('users');
            ref.once('value', function(snap) {
                snap.forEach(function(item) {
                    var itemVal = item.val();
                    list.push(itemVal);
                    console.log(itemVal);
                });
            });

            return list;


        } catch (e) {
            console.log(e);

            return ["Twitter"];
        }
    }

    
}