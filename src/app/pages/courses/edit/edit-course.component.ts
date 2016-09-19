import {Component, OnInit, OnDestroy} from '@angular/core';
import {CoursesService} from '../../../services/courses.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {Subscription} from 'rxjs';

@Component({
    selector: 'home',
    template: require('./edit-course.html'),
})
export class EditCourseComponent implements OnInit, OnDestroy {
    course: Object;
    id: string = '';
    routeSub: Subscription;
    mode: string = 'Edit';

    constructor(private route: ActivatedRoute,
                private coursesService: CoursesService,
                private location: Location) {
    }

    ngOnInit(): void {
        this.routeSub = this.route.params.subscribe(params => {
            this.id = params['id'];
            if (this.id !== 'new') {
                this.getCourse();
            } else {
                this.mode = 'Add';
                this.renderCourse({
                    title: '',
                    description: '',
                    img: ''
                });
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }

    getCourse() {
        this.coursesService
            .getCourse(this.id)
            .subscribe(res => this.renderCourse(res));
    }

    renderCourse(data) {
        this.course = data;
    }

    goBack() {
        this.location.back();
    }
}