import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {CoursesComponent} from './courses.component';
import {EditCourseComponent} from './edit-page/edit-course.component';
import {CourseItemComponent} from './course-item/course-item.component';
import {CoursesService} from '../../services/courses.service';
import {coursesRouting} from './courses.routing';
import {SearchPipe} from './search.pipe';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        coursesRouting
    ],
    declarations: [
        SearchPipe,
        CoursesComponent,
        CourseItemComponent,
        EditCourseComponent
    ],
    providers: [
        CoursesService
    ]
})
export class CoursesModule {
    constructor() {
    }
}
