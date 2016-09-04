import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "./app.component";
import {routing} from "./app.routes";
import {HttpModule} from '@angular/http';
import {HomeComponent} from "./pages/home/home.conponent";
import {LoginComponent} from "./pages/login/login.component";
import {FormsModule} from "@angular/forms";
import {LoggedInGuard} from "./guards/loggedin.guard";
import {AuthService} from "./services/auth.service";

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        routing
    ],
    declarations: [
        AppComponent,
        HomeComponent,
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
