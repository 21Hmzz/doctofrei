
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import {RegisterComponent} from './auth/register/register.component';
import {LoginComponent} from './auth/login/login.component';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {DashboardComponent as ProDashboardComponent} from "./pro/dashboard/dashboard.component";
import {AuthGuard} from "./auth/auth.guard";
import {LogoutComponent} from "./auth/logout.component";
import { AboutComponent } from './about/about.component';
import { SpecialitesComponent } from './specialites/specialites.component';
import { PageDocteursComponent } from './page-docteurs/page-docteurs.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path:'contact',
    component: ContactComponent
  },
  {
    path: 'register', 
    component: RegisterComponent
  },
  {
    path: 'login', 
    component: LoginComponent
  },
  {
    path:'about',
    component: AboutComponent
  },
  {
    path: 'dashboard', 
    component: DashboardComponent,
     canActivate: [AuthGuard]
  },
  {
    path: 'pro/dashboard', 
    component: ProDashboardComponent, 
    canActivate: [AuthGuard]
  },
  {
    path: 'logout', 
    component: LogoutComponent
  },
  {
    path: 'specs',
    component: SpecialitesComponent
  },
  {
    path: 'page-doctors',
    component: PageDocteursComponent
  }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
