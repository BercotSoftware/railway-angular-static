import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {OidcSecurityService} from "angular-auth-oidc-client";
import {map, take} from "rxjs";

export const AuthGuard: CanActivateFn = (route, state) => {

  const authService = inject(OidcSecurityService)
  const router = inject(Router)

  return authService.isAuthenticated$.pipe(
    take(1),
    map((isAuthenticated) => {
      // allow navigation if authenticated
      if (isAuthenticated) {
        return true;
      }

      // redirect if not authenticated
      return router.parseUrl('/unauthorized');
    })
  )
}

