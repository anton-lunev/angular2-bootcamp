import {Component, OnInit, OnDestroy} from '@angular/core';
import {RouterConnector} from 'ngrx-store-router';

@Component({
    selector: 'app',
    template: require('./app.html'),
    styles: [require('./app.pcss')]
})
export class AppComponent implements OnInit, OnDestroy {
    constructor(private rc: RouterConnector) {
    }

    ngOnInit() {
        this.rc.connect();
    }

    ngOnDestroy() {
        this.rc.disconnect();
    }
}
