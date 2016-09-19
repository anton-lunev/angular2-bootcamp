import {Component, OnInit, OnDestroy} from '@angular/core';
import {AuthService} from './services/auth.service';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';

@Component({
    selector: 'app',
    template: require('./app.html'),
    styles: [require('./app.pcss')]
})
export class AppComponent implements OnInit, OnDestroy {
    subscriptions: Subscription[] = [];
    user: string;

    constructor(private authService: AuthService,
                private store: Store<any>) {
    }

    ngOnInit() {
        this.subscriptions.push(
            this.store.select('user').subscribe((user: string) => {
                this.user = user;
            })
        );
        this.authService.initUser();
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }
}
