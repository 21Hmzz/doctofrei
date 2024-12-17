import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (this.authService.isAuthenticated()) {
            const currentRole = this.authService.getRole();
            switch (currentRole) {
                case 'docteur':
                    if (state.url !== '/pro/dashboard') {
                        this.router.navigate(['/pro/dashboard']).then();
                    }
                    break;
                case 'user':
                    if (state.url !== '/dashboard') {
                        this.router.navigate(['/dashboard']).then();
                    }
                    break;
                default:
                    if (state.url !== '/dashboard') {
                        this.router.navigate(['/dashboard']).then();
                    }
                    break;
            }
            return true;
        } else {

            this.router.navigate(['/login']).then();
            return false;
        }
    }

}
