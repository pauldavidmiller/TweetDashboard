import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponent } from './userlist/userlist.component';
import { UserComponent } from './user/user.component';
import { UserListService } from './userlist/userlist.service';
import { UserService } from './user/user.service';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    UserService,
    UserListService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
