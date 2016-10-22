import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {AppModule} from './app/app.module';
import 'bootstrap/dist/css/bootstrap-flex.css';
import './assets/css/styles.pcss';

platformBrowserDynamic().bootstrapModule(AppModule);
