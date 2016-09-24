import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './pages/login/login.component';

const appRoutes: Routes = [
    {path: 'login', component: LoginComponent}
];

export const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes, {useHash: true});
