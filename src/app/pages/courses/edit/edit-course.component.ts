import {Component, OnInit} from '@angular/core'
import {CoursesService} from "../../../services/courses.service";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";

@Component({
    selector: 'home',
    template: require('./edit-course.html'),
})
export class EditCourseComponent implements OnInit {
    course: Object;
    id: string = '';

    constructor(
        private route: ActivatedRoute,
        private coursesService: CoursesService,
        public location: Location
    ) {
        route.params.subscribe(params => {
            this.id = params['id'];
        });
    }

    ngOnInit(): void {
        this.coursesService
            .getCourse(this.id)
            .subscribe(res => this.renderCourse(res))
    }

    renderCourse(data) {
        this.course = data;
    }

    goBack() {
        this.location.back()
    }
}
