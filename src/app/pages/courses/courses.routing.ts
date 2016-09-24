import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CoursesComponent} from './courses.component';
import {EditCourseComponent} from './edit-page/edit-course.component';
import {LoggedInGuard} from '../../guards/loggedin.guard';

const coursesRoutes: Routes = [
    {path: '', redirectTo: 'courses', pathMatch: 'full'},
    {path: 'courses', component: CoursesComponent, canActivate: [LoggedInGuard]},
    {path: 'courses/:id', component: EditCourseComponent, canActivate: [LoggedInGuard]},
];

export const coursesRouting: ModuleWithProviders = RouterModule.forChild(coursesRoutes);
