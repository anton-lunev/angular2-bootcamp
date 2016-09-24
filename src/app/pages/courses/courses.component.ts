import {Component, OnInit} from '@angular/core';
import {CoursesService} from '../../services/courses.service';

@Component({
    selector: 'courses',
    template: require('./courses.html'),
})
export class CoursesComponent implements OnInit {
    list: Object[] = [];
    searchQuery: string = '';

    constructor(private coursesService: CoursesService) {
    }

    ngOnInit(): void {
        this.coursesService
            .getList()
            .subscribe(res => this.renderCourses(res));
    }

    renderCourses(data) {
        this.list = data;
    }
}
