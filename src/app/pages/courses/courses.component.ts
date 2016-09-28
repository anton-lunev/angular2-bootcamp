import {Component, OnInit, OnDestroy} from '@angular/core';
import {CoursesService} from '../../services/courses.service';
import * as coursesActions from '../../store/courses/courses.actions';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';

@Component({
    selector: 'courses',
    template: require('./courses.html'),
})
export class CoursesComponent implements OnInit, OnDestroy {
    subscriptions: Subscription[];
    list: Object[] = [];
    filter: Object;

    constructor(private coursesService: CoursesService,
                private store: Store<any>) {
    }

    ngOnInit() {
        this.subscriptions = [
            this.store.select('courses').subscribe((list: Object[]) => this.renderCourses(list)),
            this.store.select('coursesFilter').subscribe((filter: Object) => this.filter = filter)
        ];
        this.coursesService.getList();
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    searchTextChanged(text: string) {
        this.store.dispatch({type: coursesActions.SEARCH_TEXT, payload: text});
    }

    renderCourses(data) {
        this.list = data;
    }

    deleteCourse(course) {
        this.coursesService.deleteCourse(course);
    }
}
