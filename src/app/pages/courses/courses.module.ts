import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {CoursesService} from '../../services/courses.service';
import {VideoService} from '../../services/video.service';

import {CoursesComponent} from './courses.component';
import {EditCourseComponent} from './edit-page/edit-course.component';
import {CourseItemComponent} from './course-item/course-item.component';
import {VideoPopupComponent} from './video-popup/video-popup.component';
import {coursesRouting} from './courses.routing';
import {SearchPipe} from './search.pipe';
import {TimePipe} from './time.pipe';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        coursesRouting
    ],
    declarations: [
        SearchPipe,
        TimePipe,
        CoursesComponent,
        CourseItemComponent,
        EditCourseComponent,
        VideoPopupComponent
    ],
    providers: [
        CoursesService,
        VideoService
    ]
})
export class CoursesModule {
    constructor() {
    }
}
