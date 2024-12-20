import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { Docteur, DocteurComplet, Specialite, User } from 'src/database/types';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getCompleteDoctors(): Observable<DocteurComplet[]> {
    return this.http.get<any[]>(`${this.apiUrl}/docteurs`).pipe(
      switchMap((docteurs) => {
        const docteurDetails$ = docteurs.map((docteur) =>
          this.http.get<User>(`${this.apiUrl}/utilisateurs/${docteur.id_utilisateur}`).pipe(
            switchMap((utilisateur) => {
              const specialites$ = docteur.specialites.map((specialiteId: number) =>
                this.http.get<Specialite>(`${this.apiUrl}/specialites/${specialiteId}`)
              );
              return forkJoin(specialites$).pipe(
                map((specialites) => ({
                  id: docteur.id,
                  utilisateur: {
                    id: utilisateur.id,
                    nom: utilisateur.nom,
                    prenom: utilisateur.prenom,
                    email: utilisateur.email,
                    role: utilisateur.role,
                    telephone: utilisateur.telephone,
                    password: utilisateur.password,
                    createdAt: utilisateur.createdAt,
                    updatedAt: utilisateur.updatedAt,
                  },
                  specialites,
                  adresse_cabinet: docteur.adresse_cabinet,
                  ville: docteur.ville,
                  photo: 'assets/default-photo.avif',
                } as DocteurComplet))
              );
            })
          )
        );
        return forkJoin(docteurDetails$);
      })
    );
  }

}
