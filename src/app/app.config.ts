import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';

import {APP_ROUTES} from './app.routes';
import {HttpClientModule} from "@angular/common/http";
import {ApiModule, BASE_PATH, Configuration, ConfigurationParameters} from "@golf-api";
import {environment} from "../environments/environment";

/**
 * Establish the base URL for API calls to the resource server
 */
export function playGolfApiConfig() : Configuration {
  const params: ConfigurationParameters = {
    basePath: environment.PLAY_GOLF_API_URL
  };
  return new Configuration(params);
}


export const appConfig: ApplicationConfig = {
    providers: [
      provideRouter(APP_ROUTES),
      importProvidersFrom(HttpClientModule),
      importProvidersFrom(ApiModule.forRoot(playGolfApiConfig))
  ]
};
