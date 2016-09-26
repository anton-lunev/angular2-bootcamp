import {Injectable} from '@angular/core';
import {Http, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs';
import {MLab} from './mlab';
import {Store} from '@ngrx/store';
import * as coursesActions from '../store/courses/courses.actions';

@Injectable()
export class CoursesService extends MLab {
    protected collection = 'courses';

    constructor(private http: Http,
                private store: Store<any>) {
        super();
    }

    getList(): Observable<any[]> {
        return this.http.get(this.getQueryUrl())
            .map(result => {
                const courses = result.json();
                this.store.dispatch({type: coursesActions.COURSES_LIST, payload: courses});
                return courses;
            });
    }

    getCourse(id: string): Observable<any[]> {
        const params = new URLSearchParams();
        params.set('q', JSON.stringify({_id: {$oid: id}}));
        params.set('fo', 'true');

        return this.http.get(this.getQueryUrl(), {search: params})
            .map(result => result.json());
    }
}
