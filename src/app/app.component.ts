import {Component} from '@angular/core'
import {AuthService} from "./services/auth.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app',
    template: require('./app.html'),
    styles: [require('./app.pcss')]
})
export class AppComponent {
    constructor(private authService: AuthService) {
    }
}
