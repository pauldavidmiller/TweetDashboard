import { Component, OnInit } from '@angular/core';
import { AuthRoutingModule } from '../auth-routing.module';
import { AuthModule } from '../auth.module';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm){
    console.log(f.value);
    console.log(f.valid);

    // Check credentials with database
  }

  goToPage(page: string){
    this.router.navigateByUrl(page)
  }

}
