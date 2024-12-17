import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RendezVous} from "../../database/types";

@Injectable({
  providedIn: 'root'
})
export class RendezVousService {

  private apiUrl = 'http://localhost:3000/rendezvous';

  constructor(private http: HttpClient) { }

 getRendezVousByClientId(clientId: string): Observable<RendezVous[]> {
    return this.http.get<RendezVous[]>(`${this.apiUrl}?idClient=${clientId}`);
  }
} 
