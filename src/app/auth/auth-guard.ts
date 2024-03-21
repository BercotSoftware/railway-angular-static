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
        console.log('Auth guard passed')
        return true;
      }

      // redirect if not authenticated
      console.log('Auth guard failed')
      return router.parseUrl('/unauthorized');
    })
  )
}

