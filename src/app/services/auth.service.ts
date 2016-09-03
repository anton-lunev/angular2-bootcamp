import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {
    private baseUrl = 'https://api.mlab.com/api/1/databases';
    private apiKey = 'hlrhBvtVSrE1yzYRCfG4A4Q4ZaA00mn9';
    private dbName = 'angular2_db';
    private usersCollection = 'users';
    private apiUrl = `${this.baseUrl}/${this.dbName}/collections/${this.usersCollection}?apiKey=${this.apiKey}`;

    constructor(private http: Http) {

    }

    logIn(login: string, password: string) {
        console.log(password);
        const q = JSON.stringify({name: login, pwd: password});
        return this.http.get(`${this.apiUrl}&q=${q}`)
            .toPromise()
            .then((result) => {
                console.log(result);
                return result.json();
            })
            .catch((error) => console.log(error))
    }

    logOff() {

    }
}
