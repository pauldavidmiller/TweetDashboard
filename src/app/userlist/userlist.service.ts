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

    constructor(private auth: AngularFireAuth, public db: AngularFireDatabase) {
        let n = this.db.list('clients').valueChanges().subscribe(); //This subscribes to items in the database
    }

    // getUsers is the call to the database to get the Users of the group specified
    getUsers(Group: string) {

        // Try catch block to check uid is logged in - if no login give clean slate for playground
        try {
            let uid = this.auth.auth.currentUser.uid;

            // Do fetch of data
            var list: Array<string> = [];
            var ref = firebase.database().ref().child('/clients/' + uid + '/groups/' + Group.toString()).orderByChild(Group.toString());
            ref.once('value', function (snap) {
                snap.forEach(function (item) {
                    var itemVal = item.val();
                    list.push(itemVal);
                });
            });

            return list;

        } catch (e) {
            console.log(e);

            return ["Twitter"];
        }
    }

    // getGroups is the call to the database to get the list of groups
    getGroups() {
        // Get groups from database under the user signed in
        // Try catch block to check uid is logged in - if no login give clean slate for playground
        try {
            let uid = this.auth.auth.currentUser.uid;

            var list: Array<string> = [];
            var ref = firebase.database().ref('/clients/' + uid + '/groups/').orderByChild('groups');
            ref.once('value', function (snap) {
                snap.forEach(function (item) {
                    var itemVal = item.key;
                    list.push(itemVal);
                });
            });

            return list;


        } catch (e) {
            console.log(e);

            return ["All"];
        }
    }

    // updateUsers is the call to update the users per Group in the database
    updateUsers(users: any, Group: string) {

        // Try catch block to check uid is logged in
        try {
            let uid = this.auth.auth.currentUser.uid;

            // Update user list in database
            firebase.database().ref('clients/' + uid + '/groups/' + Group).set(users);


        } catch (e) {
            console.log(e);
        }
    }
}