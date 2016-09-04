import {Component} from '@angular/core'
import {AuthService} from "./services/auth.service";
import {Router} from "@angular/router";

@Component({
    selector: 'my-app',
    template: require('./app.html')
})
export class AppComponent {
    constructor(private authService: AuthService) {
    }
}
