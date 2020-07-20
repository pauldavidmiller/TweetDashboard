import { Component, Input } from '@angular/core';
import { ClientService } from './client.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TweetDashboard';

  constructor(public client: ClientService, private router: Router, private auth: AngularFireAuth) {
    
  }

  goToPage(page: string){
    this.router.navigateByUrl(page)
  }

}
