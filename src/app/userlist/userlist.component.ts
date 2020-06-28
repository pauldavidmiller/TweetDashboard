import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { UserListService } from './userlist.service';
import { UserService } from '../user/user.service';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserListComponent implements OnInit {

  title = "Add Twitter Timelines and Build Your Dashboard!";
  users;
  groups;
  selectedGroups: Array<string> = []; // all selected groups - only one can be selected to have users added

  constructor(public service: UserListService) {
    //var groupToGetTEMP = "Friends";
    // Get Users from Database
    //this.users = service.getUsers(groupToGetTEMP);
    // Get Groups from Database
    this.groups = service.getGroups();
    // Start with all groups selected initially
    // this.changeGroup(groupToGetTEMP);
  }

  ngOnInit(): void {
  }

  addUser(newUser: string) {

    // Update list
    if (newUser) {
      this.users.push(newUser);
    }

    // Update database
    this.service.updateUsers(this.users, this.selectedGroups[0]);

    console.log(this.users)
  }

  removeUser(User: string) {

    // Update list
    if (User) {
      // Get index of user
      let index = this.users.indexOf(User);
      this.users.splice(index, 1);
      console.log(User);
      console.log(index);
      console.log(this.users);
    }

    // Update database
    this.service.updateUsers(this.users, this.selectedGroups[0]);
  }


  addGroup(newGroup: string) {
    // Add Group to Page and Database
    if (newGroup) {
      this.groups.push(newGroup);
    }

    // Update database
    this.service.updateGroups(this.groups);

    console.log(this.groups);

  }

  removeGroup(Group: string) {
    // Update list
    if (Group) {
      // Get index of group
      let index = this.groups.indexOf(Group);
      this.groups.splice(index, 1);
      console.log(Group);
      console.log(index);
      console.log(this.groups);
    }

    // Update database
    this.service.updateGroups(this.groups);
  }


  changeGroup(selected: boolean, Group: string) {
    // Check which groups are selected and are in the group list
    if (selected) {
      // Add groups to list if selected
      this.selectedGroups.push(Group);
    } else {
      // Remove groups from list if deselected
      var index = this.selectedGroups.indexOf(Group);
      console.log("index of selected false: " + index);
      this.selectedGroups.splice(index, )
      this.selectedGroups.splice(index, 1);
    }

    // Change display of selected groups
    var allUsers: Array<string> = [];
    for (let i = 0; i < this.selectedGroups.length; i++) {
      const group = this.selectedGroups[i];
      var groupUsers = this.service.getUsers(group.toString());

      console.log("groupUsers");
      console.log(groupUsers);

      // TODO: FIX THIS

      for (let j = 0; j < groupUsers.length; j++) {
        const user = groupUsers[j];
        console.log("user");
        console.log(user);
        allUsers.push(user.toString());
      }
    }

    this.users = allUsers;
  

    //console.log("selected groups: " + this.selectedGroups);
  }
}
