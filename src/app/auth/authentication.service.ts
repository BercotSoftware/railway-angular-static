import {Injectable} from '@angular/core';
import {
  ApiResponse,
  AuthorizeInput,
  Authorizer, AuthorizeResponse,
  AuthToken,
  ConfigType, GetTokenResponse,
  ResponseTypes
} from "@authorizerdev/authorizer-js";

const authorizerConfig : ConfigType = {
  authorizerURL: 'https://authorizer-production-8226.up.railway.app',
  redirectURL: window.location.origin,
  clientID: '69ab67f4-6498-40f6-90b2-d08cc02d00dc',
  extraHeaders: undefined
}

const authorizerInput : AuthorizeInput = {
  response_type: ResponseTypes.Token,
  response_mode: 'query',
  use_refresh_token: true
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  private authRef = new Authorizer(authorizerConfig);
  private _isLoggedIn: boolean = false;
  private authToken?: GetTokenResponse | AuthorizeResponse;

  constructor() {

  }

  get isLoggedIn() : boolean {
    return this._isLoggedIn
  }

  login() : Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.authRef.authorize(authorizerInput);
        if (response.data) {
          console.log('Received Auth token', JSON.stringify(response.data));
          this._isLoggedIn = true;
          this.authToken = response.data;
          resolve(true);
        } else {
          console.log('Authentication failed (no data)');
          this._isLoggedIn = false;
          this.authToken = undefined;
          reject('Authentication failed (no data)');
        }
      } catch (error) {
        console.log('Authentication failed with error', error);
        this._isLoggedIn = false;
        this.authToken = undefined;
        reject(error);
      }
    })
  }

  logout() {
  }

  authorize() {
    return this.authRef.authorize(authorizerInput)
  }

}
