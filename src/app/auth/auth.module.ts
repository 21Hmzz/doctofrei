import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {RegisterComponent} from './register/register.component';
import {AuthService} from './auth.service';
import {LoginComponent} from "./login/login.component";
import {LogoutComponent} from "./logout.component";

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  providers: [AuthService],
})
export class AuthModule {
}
