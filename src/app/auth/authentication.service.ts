import {Injectable} from '@angular/core';
import {
  ApiResponse,
  AuthorizeInput,
  Authorizer, AuthorizeResponse,
  AuthToken,
  ConfigType, GetTokenResponse,
  ResponseTypes
} from "@authorizerdev/authorizer-js";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import {Observable} from 'rxjs';
import {Router} from "@angular/router";

const authorizerConfig: ConfigType = {
  authorizerURL: 'https://authorizer-production-8226.up.railway.app',
  redirectURL: window.location.origin,
  clientID: '69ab67f4-6498-40f6-90b2-d08cc02d00dc',
  extraHeaders: undefined
}

const authorizerInput: AuthorizeInput = {
  response_type: ResponseTypes.Token,
  response_mode: 'query',
  use_refresh_token: true
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements HttpInterceptor {


  private authRef = new Authorizer(authorizerConfig);
  private _isAuthorized: boolean = false;
  private authToken?: GetTokenResponse | AuthorizeResponse;

  constructor(private router: Router) {
  }


  get isAuthorized(): boolean {
    return this._isAuthorized
  }

  authorize(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
        await this.authRef.authorize(authorizerInput).then((response) => {
          console.log('AuthService success', response)
            this._isAuthorized = true

            resolve(true)
          })
          .catch ((error) => {
            console.log('AuthService failure', error)
            this._isAuthorized = false
            reject(error)
          })
    })
  }

  logout() : Promise<void> {
    return new Promise( async () => {
      try {
        const response = await this.authRef.logout().then((result) => {
          this._isAuthorized = false
        })
      } catch (error) {
        this._isAuthorized = false
      }
    })
  }

  // see https://www.kevinschuchard.com/blog/2019-05-08-http-interceptor

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Intercepted', request)
    return next.handle(request)
  }
}
