// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'https://play-golf-server-production.up.railway.app',                      // The resource server
  authUrl: 'https://keycloak-production-d6f9.up.railway.app/realms/play-golf',    // The authentication server
  authClientId: "play-golf",
};
