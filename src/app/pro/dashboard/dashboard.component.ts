import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { RDVWithUser } from '../../../database/types';
import { RendezVousService } from '../../services/rendezvous.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public user: any = null;
  doctorRendezVous: RDVWithUser[] = [];

  constructor(
    private authService: AuthService,
    private rendezVousService: RendezVousService
  ) {}

  ngOnInit(): void {
    this.authService.getUserInfo().subscribe((user) => {
      if (user) {
        this.user = user;
        this.rendezVousService
          .getRendezVousByDoctorId(this.user.id)
          .subscribe((rendezvous) => {
            console.log(rendezvous);
            this.doctorRendezVous = rendezvous;
          });
      } else {
        console.error('Utilisateur non trouvé');
      }
    });
  }

  cancelRendezVous(rdvId: string): void {
    this.rendezVousService.cancelRendezVous(rdvId).subscribe(
      (response) => {
        console.log('Rendez-vous annulé', response);
        this.rendezVousService
          .getRendezVousByDoctorId(this.user.id)
          .subscribe((rendezvous) => {
            console.log(rendezvous);
            this.doctorRendezVous = rendezvous;
          });
      },
      (error) => {
        console.error("Erreur lors de l'annulation du rendez-vous", error);
      }
    );
  }

  confirmRendezVous(rdvId: string): void {
    this.rendezVousService.confirmRendezVous(rdvId).subscribe(
      (response) => {
        this.rendezVousService
          .getRendezVousByDoctorId(this.user.id)
          .subscribe((rendezvous) => {
            console.log(rendezvous);
            this.doctorRendezVous = rendezvous;
          });
      },
      (error) => {
        console.error('Erreur lors de la confirmation du rendez-vous', error);
      }
    );
  }
}
