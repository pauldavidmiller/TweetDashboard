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

  title = "User List Component";
  users;

  constructor(service: UserListService) { 
    this.users = service.getUsers();
  }

  ngOnInit(): void {
  }

  addUser(newUser: string){
    if (newUser) {
      this.users.push(newUser);
    }
  }

  removeUser(User: string) {
    if (User){
      // Get index of user
      let index = this.users.indexOf(User)
      this.users.splice(index)
    }
  }

  getUsers() {
    return this.users;
  }
}