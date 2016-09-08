import {CanActivate, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {Injectable} from '@angular/core';

@Injectable()
export class LoggedInGuard implements CanActivate {
    constructor(private authService: AuthService,
                private router: Router) {

    }

    canActivate(): boolean {
        const isLoggedIn = this.authService.isLoggedIn();
        if (!isLoggedIn) {
            this.router.navigate(['login']);
        }
        return isLoggedIn;
    }
}
