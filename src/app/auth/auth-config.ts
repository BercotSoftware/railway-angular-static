import {OpenIdConfiguration} from 'angular-auth-oidc-client';
import {environment} from "@env";

export const openIdConfiguration: OpenIdConfiguration = {
  configId: 'keycloak',
  authority: environment.JWT_ISSUER_URL,
  redirectUrl: `${window.location.origin}/home`,
  postLogoutRedirectUri: `${window.location.origin}/intro`,
  clientId: environment.JWT_ISSUER_CLIENT_ID,
  scope: 'openid profile roles phone',
  responseType: 'code',
  silentRenew: true,
  useRefreshToken: true,
  renewTimeBeforeTokenExpiresInSeconds: 30,
  ignoreNonceAfterRefresh: true,
  forbiddenRoute: `${window.location.origin}/loginError`,
  unauthorizedRoute: `${window.location.origin}/loginError`,
  secureRoutes: [environment.PLAY_GOLF_API_URL]
};
