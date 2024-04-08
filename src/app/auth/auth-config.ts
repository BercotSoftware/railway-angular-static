import {LogLevel, OpenIdConfiguration} from 'angular-auth-oidc-client';
import {environment} from "@env";

export const openIdConfiguration: OpenIdConfiguration = {
  configId: 'keycloak',
  authority: environment.JWT_ISSUER_URL,
  clientId: environment.JWT_ISSUER_CLIENT_ID,
  redirectUrl: `${window.location.origin}/home`,
  postLogoutRedirectUri: `${window.location.origin}/home`,
  scope: 'openid profile roles phone email address roles offline_access',
  responseType: 'code',
  silentRenew: true,
  useRefreshToken: true,
  renewTimeBeforeTokenExpiresInSeconds: 30,
  ignoreNonceAfterRefresh: true,
  forbiddenRoute: `${window.location.origin}/loginError`,
  unauthorizedRoute: `${window.location.origin}/loginError`,
  secureRoutes: [environment.PLAY_GOLF_API_URL],
  logLevel: LogLevel.Debug,
};

// See: https://damienbod.com/2017/06/16/angular-oidc-oauth2-client-with-google-identity-platform/
export const googleOauthConfiguration : OpenIdConfiguration = {
  authority: 'https://accounts.google.com',
  redirectUrl: window.location.origin,
  clientId: '188968487735-b1hh7k87nkkh6vv84548sinju2kpr7gn.apps.googleusercontent.com',
  responseType: 'id_token token',
  scope: 'openid email profile',
  triggerAuthorizationResultEvent: true,
  postLogoutRedirectUri: window.location.origin + '/unauthorized',
  startCheckSession: false,
  silentRenew: false,
  silentRenewUrl: window.location.origin + '/silent-renew.html',
  postLoginRoute: '/home',
  forbiddenRoute: '/forbidden',
  unauthorizedRoute: '/unauthorized',
  logLevel: LogLevel.Debug,
  historyCleanupOff: true,
  // iss_validation_off: false
  // disable_iat_offset_validation: true
}
