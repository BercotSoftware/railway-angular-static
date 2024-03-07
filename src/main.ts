import {bootstrapApplication} from '@angular/platform-browser';
import {appConfig} from './app/app.config';
import {AppComponent} from './app/app.component';

// https://angular.io/api/platform-browser/bootstrapApplication


bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
