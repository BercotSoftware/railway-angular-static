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
