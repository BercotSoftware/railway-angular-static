import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';

import {APP_ROUTES} from './app.routes';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ApiModule, Configuration, ConfigurationParameters} from "@golf-api";
import {environment} from "../environments/environment";
import {AuthenticationService} from "./auth/authentication.service";

/**
 * Establish the base URL for API calls to the resource server
 */
function playGolfApiConfig() : Configuration {
  const params: ConfigurationParameters = {
    basePath: environment.apiUrl
  };
  return new Configuration(params);
}


export const appConfig: ApplicationConfig = {
    providers: [
      provideRouter(APP_ROUTES),
      importProvidersFrom(HttpClientModule),
      importProvidersFrom(ApiModule.forRoot(playGolfApiConfig)),
      { provide: HTTP_INTERCEPTORS, useClass: AuthenticationService, multi: true }
  ]
};
