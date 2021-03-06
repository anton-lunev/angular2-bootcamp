import {NgModule, enableProdMode} from '@angular/core';
import {BrowserModule, disableDebugTools} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {AppComponent} from './app.component';
import {appRouting} from './app.routing';
import {LoggedInGuard} from './guards/loggedin.guard';
import {AuthService} from './services/auth.service';
import {reducers} from './store';
import {CoursesModule} from './pages/courses/courses.module';
import {LoginComponent} from './pages/login/login.component';
import {AppHeaderComponent} from './components/header/header.component';
import {provideRouterConnector} from 'ngrx-store-router';

if (process.env.ENV === 'prod') {
    disableDebugTools();
    enableProdMode();
}

const NGRX_STORE_MODULES = [
    StoreModule.provideStore(reducers)
];
if (process.env.ENV !== 'prod') {
    NGRX_STORE_MODULES.push(StoreDevtoolsModule.instrumentStore());
}

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        CoursesModule,
        appRouting,
        ...NGRX_STORE_MODULES
    ],
    declarations: [
        AppComponent,
        AppHeaderComponent,
        LoginComponent
    ],
    providers: [
        LoggedInGuard,
        AuthService,
        provideRouterConnector()
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}
