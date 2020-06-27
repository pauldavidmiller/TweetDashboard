import { Component, OnInit } from '@angular/core';
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

  constructor(public service: UserListService) { 
    // Get Users from Database
    this.users = service.getUsers();
    // Get Groups from Database
    this.groups = service.getGroups();
  }

  ngOnInit(): void {
  }

  addUser(newUser: string){

    // Update list
    if (newUser) {
      this.users.push(newUser);
    }

    // Update database
    this.service.updateUsers(this.users);

    console.log(this.users)
  }

  removeUser(User: string) {

    // Update list
    if (User){
      // Get index of user
      let index = this.users.indexOf(User);
      this.users.splice(index, 1);
      console.log(User);
      console.log(index);
      console.log(this.users);
    }

    // Update database
    this.service.updateUsers(this.users);
  }


  addGroup(newGroup: string){
    // Add Group to Page and Database
    if (newGroup){
      this.groups.push(newGroup);
    }

    // Update database
    this.service.updateGroups(this.groups);

    console.log(this.groups);

  }

  removeGroup(Group: string){
    // Update list
    if (Group){
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

  changeGroup(Group: string){
    // Change display of group
    if (Group){
      
    }
  }
}
