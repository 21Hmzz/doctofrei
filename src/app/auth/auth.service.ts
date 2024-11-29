import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Client} from "../../database/types";
import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/clients';

  constructor(private http: HttpClient) {
  }

  register(client: Client): Observable<any> {
    return this.http.post(this.apiUrl, client);
  }


  login(email: string, password: string): void {
    this.http.get<Client[]>(this.apiUrl).subscribe((clients) => {
      const client = clients.find(c => c.email === email);

      if (client && bcrypt.compareSync(password, client.password)) {
        if (client.id) {
          localStorage.setItem('token', client.id.toString());
        } else {
          console.error('Identifiants invalides');
        }
      } else {
        console.error('Identifiants invalides');
      }
    });
  }


  logout()
    :
    void {
    localStorage.removeItem('token');
  }

  getToken()
    :
    string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated()
    :
    boolean {
    return !!this.getToken();
  }
}
