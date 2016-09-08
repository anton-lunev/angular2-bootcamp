import {Injectable} from '@angular/core';
import {Http, URLSearchParams} from '@angular/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {MLab} from './mlab';

@Injectable()
export class AuthService extends MLab {
    protected collection = 'users';

    constructor(private http: Http, private route: Router) {
        super();
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
                }
                return data;
            });
    }

    logout(): any {
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
