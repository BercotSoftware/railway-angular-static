import {importProvidersFrom, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {provideRouter, RouterLink, RouterOutlet} from "@angular/router";
import {ApiModule, BASE_PATH, Configuration, ConfigurationParameters} from "@golf-api";
import {AppComponent} from "./app.component";
import {APP_ROUTES} from "./app.routes";
import {HttpClientModule} from "@angular/common/http";
import {environment} from "../environments/environment";

/**
 * Establish the base URL for API calls to the resource server
 */
function playGolfApiConfig() {
  const params: ConfigurationParameters = {
    basePath: environment.playGolfApiUrl
  };
  return new Configuration(params);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ApiModule.forRoot(playGolfApiConfig),
    CommonModule,
    RouterOutlet,
    RouterLink,
  ],
  providers: [
    provideRouter(APP_ROUTES),
    importProvidersFrom(HttpClientModule),
    { provide: BASE_PATH, useValue: 'http://yomama.com:4000' }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
