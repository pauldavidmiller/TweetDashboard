import { Component, Input } from '@angular/core';
import { AngularFireDatabase } from "angularfire2/database";
import { ClientService } from './client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TweetDashboard';

  constructor(public client: ClientService, private router: Router) {
    
  }

  goToPage(page: string){
    this.router.navigateByUrl(page)
  }

}
