import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Specialite} from "../../database/types";


@Injectable({
  providedIn: 'root'
})
export class SpecialiteService {

  private apiUrl = 'http://localhost:3000/specialites'

  constructor(private http: HttpClient) { }
  
  getSpecialites(): Observable<Specialite[]> {
    return this.http.get<Specialite[]>(`${this.apiUrl}`);
  }
}
