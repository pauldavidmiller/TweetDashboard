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

  constructor(public service: UserListService) { 
    this.users = service.getUsers();
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
      let index = this.users.indexOf(User)
      this.users.splice(index, 1)
      console.log(User)
      console.log(index)
      console.log(this.users)
    }

    // Update database
    this.service.updateUsers(this.users);
  }
}
