import { Component, OnInit } from '@angular/core';
import { PoliticiansService } from './politicians.service';
import { PoliticianService } from '../politician/politician.service';

@Component({
  selector: 'app-politicians',
  templateUrl: './politicians.component.html',
  styleUrls: ['./politicians.component.css']
})
export class PoliticiansComponent implements OnInit {

  title = "Politicians Component";
  politicians;

  constructor(service: PoliticiansService) { 
    this.politicians = service.getPoliticians();
  }

  ngOnInit(): void {
  }

  // Logic for calling Twitter API HTTP Service

}
