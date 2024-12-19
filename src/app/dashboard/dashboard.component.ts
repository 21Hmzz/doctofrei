import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { RendezVousService } from '../services/rendezvous.service';
import { RendezVous } from '../../database/types';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public user: any = null;
  userRendezVous: RendezVous[] = [];
  isLoading = true;

  constructor(
    private authService: AuthService,
    private rendezVousService: RendezVousService
  ) {}

  ngOnInit(): void {
    this.authService.getUserInfo().subscribe((user) => {
      if (user) {
        this.user = user;
        this.rendezVousService.getRendezVousByClientId(this.user.id).subscribe(
          (rendezvous) => {
            this.userRendezVous = rendezvous;
            this.isLoading = false;
          },
          (error) => {
            console.error(
              'Erreur lors de la récupération des rendez-vous:',
              error
            );
            this.isLoading = false;
          }
        );
      } else {
      }
    });
  }
}
