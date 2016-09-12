import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import md5 =  require('md5');
import {Router} from '@angular/router';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
    selector: 'login',
    template: require('./login.html'),
    styles: [require('./login.pcss')],
    providers: [AuthService]
})
export class LoginComponent implements OnInit {
    message: string = '';
    loginForm: FormGroup;

    constructor(private authService: AuthService,
                private router: Router,
                private fb: FormBuilder) {
    }

    ngOnInit() {
        this.loginForm = this.fb.group({
            login: [
                '',
                [
                    Validators.required,
                    Validators.pattern('[A-Za-z]+')
                ]
            ],
            password: [
                '',
                [
                    Validators.required,
                    Validators.pattern('[A-Za-z0-9]+')
                ]
            ]
        });
    }

    showError(fieldName, validator) {
        const field = this.loginForm.controls[fieldName];
        return field.touched && field.hasError(validator);
    }

    logIn() {
        if (!this.loginForm.valid) {
            return;
        }

        this.authService.login(this.loginForm.value.login, md5(this.loginForm.value.password))
            .subscribe((res) => {
                if (res) {
                    this.router.navigate(['courses']);
                } else {
                    this.message = 'Incorrect credentials';
                }
            });
    }
}
