import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public user: any = null;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.getUserInfo().subscribe(user => {
      if (user) {
        this.user = user;
      } else {
      }
    });
  }
}
