import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, forkJoin, map, Observable} from 'rxjs';
import {Docteur, User} from "../../database/types";
import * as bcrypt from 'bcryptjs';
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:3000/';
    private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
    public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

    constructor(private http: HttpClient, private router: Router) {
    }

    register(user: User): Observable<any> {
        return this.http.post(this.apiUrl + 'utilisateurs', user);
    }


    login(email: string, password: string): void {
        this.http.get<User[]>(this.apiUrl + 'utilisateurs').subscribe((users) => {
            const user = users.find(c => c.email === email);
            if (user && bcrypt.compareSync(password, user.password)) {
                if (user.id && user.role) {
                    localStorage.setItem('token', user.id.toString());
                    localStorage.setItem('role', user.role);
                    this.isAuthenticatedSubject.next(true);
                    this.router.navigate(['/dashboard']).then();
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
        this.isAuthenticatedSubject.next(false);
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

    getUserInfo(): Observable<User | null> {
        const token = this.getToken();
        const role = this.getRole();
        let apiUrl = this.apiUrl;


        if (!token || !role) {
            return new Observable(subscriber => {
                subscriber.next(null);
                subscriber.complete();
            });
        }

        const userRequest = this.http.get<User[]>(`${apiUrl}utilisateurs`).pipe(
            map(users => users.find(c => c.id === token) || null)
        );



        if (role === 'docteur') {
            const doctorRequest = this.http.get<Docteur[]>(`${apiUrl}docteurs`).pipe(
                map(docteurs => docteurs.find(d => d.id_utilisateur === token) || null)
            );

            return forkJoin([userRequest, doctorRequest]).pipe(
                map(([user, doctor]: [User | null, Docteur | null]) => {
                    if (user) {
                        user.doctor = doctor;
                        return user;
                    }
                    return null;
                })
            );
        } else {
            return userRequest;
        }
    }
}
