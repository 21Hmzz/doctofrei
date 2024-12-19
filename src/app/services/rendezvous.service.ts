import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable } from 'rxjs';
import { Client, RDVWithUser, RendezVous, User } from '../../database/types';

@Injectable({
  providedIn: 'root',
})
export class RendezVousService {
  private apiUrl = 'http://localhost:3000/rendezvous';

  constructor(private http: HttpClient) {}

  getRendezVousByClientId(clientId: string): Observable<RendezVous[]> {
    return this.http.get<RendezVous[]>(`${this.apiUrl}?idClient=${clientId}`);
  }
  getRendezVousByDoctorId(doctorId: string): Observable<RDVWithUser[]> {
    let rdvs = this.http.get<RendezVous[]>(
      `${this.apiUrl}?idDoctor=${doctorId}`
    );
    let users = this.http.get<User[]>(`http://localhost:3000/utilisateurs`);

    return forkJoin([rdvs, users]).pipe(
      map(([rdvs, users]) => {
        return rdvs.map((rdv) => {
          console.log(rdv.idClient);
          const user = users.find((user) => user.id == rdv.idClient);
          if (!user) {
            throw new Error(`User not found for client ID ${rdv.idClient}`);
          }
          return {
            ...rdv,
            user,
          };
        });
      })
    );
  }

  confirmRendezVous(rdvId: string): Observable<RendezVous> {
    // ca utilise json-server, donc on doit mettre a jour le status du rendez-vous
    return this.http.patch<RendezVous>(`${this.apiUrl}/${rdvId}`, {
      status: 'confirmé',
    });
  }

  cancelRendezVous(rdvId: string): Observable<RendezVous> {
    return this.http.patch<RendezVous>(`${this.apiUrl}/${rdvId}`, {
      status: 'annulé',
    });
  }
}
