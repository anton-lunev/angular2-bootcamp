import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {routing} from './app.routes';
import {HttpModule} from '@angular/http';
import {CoursesComponent} from './pages/courses/courses.component';
import {LoginComponent} from './pages/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoggedInGuard} from './guards/loggedin.guard';
import {AuthService} from './services/auth.service';
import {CoursesService} from './services/courses.service';
import {EditCourseComponent} from './pages/courses/edit/edit-course.component';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {StoreLogMonitorModule, useLogMonitor} from '@ngrx/store-log-monitor';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        routing,
        StoreDevtoolsModule.instrumentStore({
            monitor: useLogMonitor({
                visible: false,
                position: 'right'
            })
        }),
        StoreLogMonitorModule,
        StoreModule.provideStore({}), // TODO make right sort of modules
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        CoursesComponent,
        EditCourseComponent
    ],
    providers: [
        LoggedInGuard,
        AuthService,
        CoursesService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor() {
    }
}
