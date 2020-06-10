import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PoliticiansComponent } from './politicians/politicians.component';
import { PoliticianComponent } from './politician/politician.component';
import { PoliticiansService } from './politicians/politicians.service';
import { PoliticianService } from './politician/politician.service';

@NgModule({
  declarations: [
    AppComponent,
    PoliticiansComponent,
    PoliticianComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    PoliticianService,
    PoliticiansService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
