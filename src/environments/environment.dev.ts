// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  PLAY_GOLF_API_URL: 'http://localhost:4000',
  JWT_ISSUER_URL: 'https://keycloak.nunjobiznezz.com/realms/play-golf',    // The authentication server
  JWT_ISSUER_CLIENT_ID: "play-golf",

  // https://console.cloud.google.com/apis/credentials/oauthclient/160870185609-s83f456jg9ke4a9la7p68c6uheslmi8r.apps.googleusercontent.com?project=play-golf-372116
  GOOGLE_API_KEY: "AIzaSyAz5sW3mZtHpoO_MvZ5ap6k2KzF92M9RqA", //API Key 1 ??
  PLAY_GOLF_UI_CLIENT_ID: "160870185609-s83f456jg9ke4a9la7p68c6uheslmi8r.apps.googleusercontent.com",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error'; // Included with Angular CLI.
