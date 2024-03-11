import {CanActivateFn, Router} from '@angular/router';
import {AuthenticationService} from "./authentication.service";
import {inject} from "@angular/core";

export const AuthGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthenticationService)
  const router = inject(Router)

  // return authService.authorize().then({
  //   data: (datum) => {
  //
  //   },
  //   errors: (errors) => {
  //
  //   }
  //   }
  // )

  console.log('Auth guard passed')
  return authService.isLoggedIn;
};
