import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {AppModule} from './app/app.module';
import './assets/css/styles.scss';
import './assets/css/styles.pcss';

platformBrowserDynamic().bootstrapModule(AppModule);
