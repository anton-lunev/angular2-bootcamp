import {ModuleWithProviders} from "@angular/core";
import {Routes, RouterModule} from '@angular/router';
import {LoggedInGuard} from "./guards/loggedin.guard";
import {LoginComponent} from "./pages/login/login.component";
import {CoursesComponent} from "./pages/courses/courses.component";
import {EditCourseComponent} from "./pages/courses/edit/edit-course.component";

const appRoutes: Routes = [
    {path: '', redirectTo: 'courses', pathMatch: 'full'},
    {path: 'courses', component: CoursesComponent, canActivate: [LoggedInGuard]},
    {path: 'courses/:id', component: EditCourseComponent, canActivate: [LoggedInGuard]},
    {path: 'login', component: LoginComponent}
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, {useHash: true});
