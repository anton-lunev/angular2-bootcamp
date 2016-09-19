import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {CoursesComponent} from './courses.component';
import {EditCourseComponent} from './edit-page/edit-course.component';
import {CourseItemComponent} from './course-item/course-item.component';
import {CoursesService} from '../../services/courses.service';
import {AuthService} from '../../services/auth.service';
import {routing} from '../../app.routes';

@NgModule({
    imports: [
        BrowserModule,
        routing
    ],
    declarations: [
        CoursesComponent,
        CourseItemComponent,
        EditCourseComponent
    ],
    providers: [
        AuthService,
        CoursesService
    ]
})
export class CoursesModule {
    constructor() {
    }
}
