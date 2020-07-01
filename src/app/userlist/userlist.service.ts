import { Injectable } from '@angular/core';
//import { of as observableOf, Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { map, elementAt } from "rxjs/operators";
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

    getUsers(Group: string) {

        // Try catch block to check uid is logged in - if no login give clean slate for playground
        try {
            let uid = this.auth.auth.currentUser.uid;
            console.log("getUsers: " + uid);

            // Do fetch of data
            var list: Array<string> = [];
            var ref = firebase.database().ref().child('/clients/' + uid + '/groups/' + Group);
            ref.once('value', function (snap) {
                snap.forEach(function (item) {
                    var itemVal = item.val();
                    list.push(itemVal);
                });
            });

            console.log("list");
            console.log(list);

            return list;

        } catch (e) {
            console.log(e);

            return ["Twitter"];
        }
    }

    getGroups() {
        // Get groups from database under the user signed in
        // Try catch block to check uid is logged in - if no login give clean slate for playground
        try {
            let uid = this.auth.auth.currentUser.uid;
            console.log("getGroups: " + uid);

            var list: Array<string> = [];
            var ref = firebase.database().ref('/clients/' + uid + '/groups/').orderByChild('groups');
            ref.once('value', function (snap) {
                snap.forEach(function (item) {
                    var itemVal = item.key;
                    list.push(itemVal);
                });
            });

            console.log("getGroups List: " + list);

            return list;


        } catch (e) {
            console.log(e);

            return ["All"];
        }
    }

    // Update the users per account in the database
    updateUsers(users: any, Group: string) {

        // Try catch block to check uid is logged in
        try {
            let uid = this.auth.auth.currentUser.uid;
            console.log("updateUsers: " + uid);

            // Update user list in database
            firebase.database().ref('clients/' + uid + '/groups/' + Group).set(users);


        } catch (e) {
            console.log(e);
        }
    }

    // TODO: Update the groups per account in the database
    updateGroups(groups: any) {
        // Try catch block to check uid is logged in
        try {
            let uid = this.auth.auth.currentUser.uid;
            console.log("updateUsers: " + uid);

            // Update group list in database
        } catch (e) {
            console.log(e);
        }
    }
}