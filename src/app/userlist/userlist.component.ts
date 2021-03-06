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

  // Global variables to be accessed by page
  newGroupTitle = "Create New Grouping";
  newUserTitle = "Add Twitter Timelines and Build Your Dashboard!";
  users; //users to be displayed from the selected groups
  groups; //all listed groups
  selectedGroups: Array<string> = []; // all selected groups - only one can be selected to have users added
  groupCount; //counts the number of users in a particular group

  constructor(public service: UserListService) {
    // Get Groups initially from Database
    this.groups = service.getGroups();
  }

  ngOnInit(): void {
  }

  // addUser adds the user input to the userlist of the ONE selected group from selectedGroups
  addUser(newUser: string) {

    // Update list
    if (newUser) {
      this.users.push(newUser);
    }

    // Update database
    this.service.updateUsers(this.users, this.selectedGroups[0]);
  }

  // removeUser removes the user from the userlist of the ONE selected group from selectedGroups
  removeUser(User: string) {

    // Update list
    if (User) {
      // Get index of user
      let index = this.users.indexOf(User);
      this.users.splice(index, 1);
    }

    // Update database
    this.service.updateUsers(this.users, this.selectedGroups[0]);
  }


  // addGroup adds the desired group to the list
  addGroup(newGroup: string) {
    // Add Group to Page and Database
    if (newGroup) {
      this.groups.push(newGroup);
    }
  }

  // removeGroup removes the desired group from the list
  removeGroup(Group: string) {
    // Update list
    if (Group) {
      // Get index of group
      let index = this.groups.indexOf(Group);
      this.groups.splice(index, 1);
    }
  }


  // changeGroup changes the selected groups and stores it in selectedGroups, also changes users selected in those groups and stores it in users
  changeGroup(selected: boolean, Group: string) {
    // Check which groups are selected and are in the group list
    if (selected && !this.selectedGroups.includes(Group)) {
      // Add groups to list if selected
      this.selectedGroups.push(Group);
    } else if (!selected && this.selectedGroups.includes(Group)){
      // Remove groups from list if deselected
      var index = this.selectedGroups.indexOf(Group);
      this.selectedGroups.splice(index, 1);
    }

    // Change display of selected groups
    var allUsers: Array<string> = [];
    // Map to display count on each group
    var tempGroupCount: Map<string, number> = new Map<string, number>();

    for (let i = 0; i < this.selectedGroups.length; i++) {
      // Get users from group
      const group = this.selectedGroups[i];
      var groupUsers = this.service.getUsers(group.toString());

      // Add number of users by group
      tempGroupCount.set(group.toString(), groupUsers.length);

      // put each user into allUsers
      for (let j = 0; j < groupUsers.length; j++) {
        const user = groupUsers[j];
        allUsers.push(user.toString());
      }
    }

    // Save users, count data to global variables
    this.users = allUsers;
    this.groupCount = tempGroupCount;
  }
}
