import {Component} from '@angular/core'
import {AuthService} from "../../services/auth.service";
import md5 =  require('md5');
import {Router} from "@angular/router";

@Component({
    selector: 'login',
    template: require('./login.html'),
    styles: [require('./login.pcss')],
    providers: [AuthService]
})
export class LoginComponent {
    login: string = '';
    password: string = '';
    message: string = '';

    constructor(private authService: AuthService, private router: Router) {
    }

    logIn() {
        this.authService.login(this.login, md5(this.password))
            .subscribe((res) => {
                if (this.authService.isLoggedIn()) {
                    this.router.navigate(['courses']);
                } else {
                    this.message = 'Incorrect credentials';
                }
            });
    }
}
