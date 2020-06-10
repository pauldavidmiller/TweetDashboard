import { Component, OnInit } from '@angular/core';
import { PoliticianService } from './politician.service';
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-politician',
  templateUrl: './politician.component.html',
  styleUrls: ['./politician.component.css']
})
export class PoliticianComponent implements OnInit {

  title = "Politicians Component";
  politician;

  constructor(service: PoliticianService, private sanitizer: DomSanitizer) { 
    this.politician = service.getPolitician("koestreicher34");
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    (<any>window).twttr.widgets.load();
  }
}
