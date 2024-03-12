import {Injectable} from '@angular/core';
import {
  ApiResponse,
  AuthorizeInput,
  Authorizer,
  AuthorizeResponse,
  ConfigType,
  GetTokenResponse,
  ResponseTypes
} from "@authorizerdev/authorizer-js";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from "@angular/router";

const AUTHORIZER_CONFIG: ConfigType = {
  authorizerURL: 'https://authorizer-production-8226.up.railway.app',
  redirectURL: `${window.location.origin}/loginSuccess`,
  clientID: '69ab67f4-6498-40f6-90b2-d08cc02d00dc',
  extraHeaders: undefined
}

const AUTHORIZER_INPUT: AuthorizeInput = {
  response_type: ResponseTypes.Token,
  response_mode: 'query',
  use_refresh_token: true
}


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements HttpInterceptor {

  private authRef = new Authorizer(AUTHORIZER_CONFIG);
  public $isAuthorized = new BehaviorSubject<boolean>(false);
  private authToken?: GetTokenResponse | AuthorizeResponse;

  constructor(private router: Router) {
    // this.authorize().then((result) => this.$isAuthorized.next(result))
  }


  get isAuthorized(): boolean {
    return this.$isAuthorized.value
  }

  authorize(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
        await this.authRef.authorize(AUTHORIZER_INPUT).then((response) => {
          console.log('AuthService success', response)
          // const accessToken = response?.data?.access_token
          // const idToken = response?.data?["id_token"]

          this.$isAuthorized.next(true)
            resolve(true)
          })
          .catch ((error) => {
            console.log('AuthService failure', error)
            this.$isAuthorized.next(false)
            reject(error)
          })
    })
  }

  logout() : Promise<void> {
    return new Promise( async () => {
      try {
        const response = await this.authRef.logout().then((result) => {
          this.$isAuthorized.next(false)
        })
      } catch (error) {
        this.$isAuthorized.next(false)
      }
    })
  }

  // see https://www.kevinschuchard.com/blog/2019-05-08-http-interceptor

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Intercepted', request)
    return next.handle(request)
  }
}
