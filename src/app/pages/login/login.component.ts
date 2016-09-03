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

    constructor(private authService: AuthService, private router: Router) {
    }

    logIn() {
        console.log(this.login, this.password);
        this.authService.logIn(this.login, md5(this.password))
            .then((res) => {
                console.log(res);
                if (res.length) {
                    console.log('user was found!');
                    this.router.navigateByUrl('home');
                }
            });
    }
}
