import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';
import {APP_ROUTES} from './app.routes';
import {HttpClientModule} from "@angular/common/http";
import {BASE_PATH} from "@golf-api";
import {environment} from "../environments/environment";
import {AuthInterceptor, AuthModule, LogLevel, OpenIdConfiguration} from 'angular-auth-oidc-client';
import {openIdConfiguration} from "./auth/auth-config";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(APP_ROUTES),
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(AuthModule.forRoot({config: [openIdConfiguration]})),
    { provide: BASE_PATH, useValue: environment.PLAY_GOLF_API_URL },   // Play-golf API base URL
  ]
};
