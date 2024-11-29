import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from "../../database/types";
import * as bcrypt from 'bcryptjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:3000/utilisateurs';

    constructor(private http: HttpClient) {
    }

    register(user: User): Observable<any> {
        return this.http.post(this.apiUrl, user);
    }


    login(email: string, password: string): void {
        this.http.get<User[]>(this.apiUrl).subscribe((users) => {
            const user = users.find(c => c.email === email);

            if (user && bcrypt.compareSync(password, user.password)) {
                if (user.id && user.role) {
                    localStorage.setItem('token', user.id.toString());
                    localStorage.setItem('role', user.role);
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
        localStorage.removeItem('role');
    }

    getToken()
        :
        string | null {
        return localStorage.getItem('token');
    }

    getRole()
        :
        string | null {
        return localStorage.getItem('role');
    }

    isAuthenticated()
        :
        boolean {
        return !!this.getToken();
    }
}
