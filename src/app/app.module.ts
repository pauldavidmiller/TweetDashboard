import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponent } from './userlist/userlist.component';
import { UserComponent } from './user/user.component';
import { UserListService } from './userlist/userlist.service';
import { UserService } from './user/user.service';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from "angularfire2/auth";
import { ClientService } from './client.service';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  providers: [
    UserService,
    UserListService,
    ClientService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
