import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AuthService} from '../../services/auth.service';
import {Store} from '@ngrx/store';

@Component({
    selector: 'app-header',
    template: require('./header.html')
})
export class AppHeaderComponent implements OnInit, OnDestroy {
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
