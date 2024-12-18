import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthModule } from './auth/auth.module';
import { HttpClientModule } from '@angular/common/http';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { DashboardComponent as ProDashboardComponent } from './pro/dashboard/dashboard.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SpecialitesComponent } from './specialites/specialites.component';
import { FirstLetterColorPipe } from './first-letter-color.pipe';
import { DoctorProfileEditComponent } from './doctor-profile-edit/doctor-profile-edit.component';
import { PatientProfileEditComponent } from './patient-profile-edit/patient-profile-edit.component';

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
    DoctorProfileEditComponent,
    PatientProfileEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
