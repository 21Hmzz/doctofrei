import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from './auth/register/register.component';
import {LoginComponent} from './auth/login/login.component';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {DashboardComponent as ProDashboardComponent} from "./pro/dashboard/dashboard.component";
import {AuthGuard} from "./auth/auth.guard";
import {LogoutComponent} from "./auth/logout.component";

const routes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'pro/dashboard', component: ProDashboardComponent, canActivate: [AuthGuard]},
  {path: 'logout', component: LogoutComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
