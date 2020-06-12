import { Component, OnInit, Input } from '@angular/core';
import { UserService } from './user.service';
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @Input() user: UserComponent

  constructor(service: UserService, private sanitizer: DomSanitizer) { 
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    (<any>window).twttr.widgets.load();
  }
}
