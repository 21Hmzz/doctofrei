import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private readonly authSubscription: Subscription;
  public isAuth: boolean = false;

  constructor(private authService: AuthService) {
    this.authSubscription = this.authService.isAuthenticated$.subscribe((authStatus) => {
      this.isAuth = authStatus;
    });
  }

  ngOnInit() {
    this.isAuth = this.authService.isAuthenticated();
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }


}
