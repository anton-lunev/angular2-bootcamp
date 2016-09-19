import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {StoreLogMonitorModule, useLogMonitor} from '@ngrx/store-log-monitor';
import {AppComponent} from './app.component';
import {routing} from './app.routes';
import {LoggedInGuard} from './guards/loggedin.guard';
import {AuthService} from './services/auth.service';
import {reducers} from './store';
import {CoursesModule} from './pages/courses/courses.module';
import {LoginComponent} from './pages/login/login.component';
import {AppHeaderComponent} from './components/header/header.component';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        CoursesModule,
        routing,
        StoreModule.provideStore(reducers),
        StoreDevtoolsModule.instrumentStore({
            monitor: useLogMonitor({
                visible: false,
                position: 'right'
            })
        }),
        StoreLogMonitorModule,
    ],
    declarations: [
        AppComponent,
        AppHeaderComponent,
        LoginComponent
    ],
    providers: [
        LoggedInGuard,
        AuthService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}
