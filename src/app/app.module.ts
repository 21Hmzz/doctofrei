import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {AuthModule} from "./auth/auth.module";
import {HttpClientModule} from "@angular/common/http";

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { DashboardComponent as ProDashboardComponent  } from './pro/dashboard/dashboard.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SpecialitesComponent } from './specialites/specialites.component';
import { FirstLetterColorPipe } from './first-letter-color.pipe';
import { PageDocteursComponent } from './page-docteurs/page-docteurs.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ContactComponent,
    AboutComponent,
    ProDashboardComponent,
    DashboardComponent,
    SpecialitesComponent,
    FirstLetterColorPipe,
    PageDocteursComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
