import {Component, OnInit, OnDestroy} from '@angular/core';
import {CoursesService} from '../../services/courses.service';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';

@Component({
    selector: 'courses',
    template: require('./courses.html'),
})
export class CoursesComponent implements OnInit, OnDestroy {
    subscriptions: Subscription[] = [];
    list: Object[] = [];
    searchQuery: string = '';

    constructor(private coursesService: CoursesService,
                private store: Store<any>) {
    }

    ngOnInit() {
        this.subscriptions.push(
            this.store.select('courses').subscribe((list: Object[]) => this.renderCourses(list))
        );
        this.coursesService.getList().subscribe();
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    renderCourses(data) {
        this.list = data;
    }
}
