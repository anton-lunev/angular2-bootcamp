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

    getList() {
        this.http.get(this.getQueryUrl())
            .map(result => result.json())
            .map(payload => ({type: coursesActions.COURSES_LIST, payload}))
            .subscribe(action => this.store.dispatch(action));
    }

    getCourse(id: string): Observable<any[]> {
        const params = new URLSearchParams();
        params.set('q', JSON.stringify({_id: {$oid: id}}));
        params.set('fo', 'true');

        return this.http.get(this.getQueryUrl(), {search: params})
            .map(result => result.json());
    }

    createCourse(course): Observable<any> {
        return this.http.post(this.getQueryUrl(), course)
            .map(result => result.json())
            .map(payload => ({type: coursesActions.COURSE_CREATE, payload}))
            .do(action => this.store.dispatch(action));
    }

    updateCourse(course): Observable<any> {
        return this.http.put(this.getQueryUrl(course._id.$oid), {'$set': course})
            .map(result => result.json())
            .map(payload => ({type: coursesActions.COURSE_UPDATE, payload}))
            .do(action => this.store.dispatch(action));
    }

    deleteCourse(course): Observable<any> {
        return this.http.delete(this.getQueryUrl(course._id.$oid))
            .map(() => ({type: coursesActions.COURSE_DELETE, payload: course}))
            .do(action => this.store.dispatch(action));
    }
}
