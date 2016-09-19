import {Injectable} from '@angular/core';
import {Http, URLSearchParams} from '@angular/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {MLab} from './mlab';
import {Store} from '@ngrx/store';
import * as authActions from '../store/auth/auth.actions';

@Injectable()
export class AuthService extends MLab {
    protected collection = 'users';
    public user: string;

    constructor(private http: Http,
                private route: Router,
                private store: Store<any>) {
        super();
    }

    initUser() {
        const user = localStorage.getItem('username');
        if (user) {
            this.store.dispatch({type: authActions.USER_LOADED, payload: user});
        }
    }

    login(username: string, password: string): Observable<any[]> {
        const params = new URLSearchParams();
        params.set('q', JSON.stringify({name: username, pwd: password}));
        params.set('fo', 'true');

        return this.http.get(this.getQueryUrl(), {search: params})
            .map(result => {
                const data = result.json();

                if (data) {
                    localStorage.setItem('username', data.name);
                    this.store.dispatch({type: authActions.USER_LOADED, payload: data.name});
                } else {
                    this.store.dispatch({type: authActions.USER_ERROR});
                }

                return data;
            });
    }

    logout(): any {
        this.store.dispatch({type: authActions.USER_LOGOUT});
        localStorage.removeItem('username');
        this.route.navigate(['login']);
    }

    getUser(): any {
        return localStorage.getItem('username');
    }

    isLoggedIn(): boolean {
        return this.getUser() !== null;
    }
}
