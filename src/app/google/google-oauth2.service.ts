import {Injectable, NgZone} from '@angular/core';

declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleOAuth2Service {

  constructor(private zone: NgZone) { }

  // see https://developers.google.com/identity/oauth2/web/guides/use-token-model

  getTokenClient(oauthConfig: any) : Promise<any> {
    return new Promise((resolve, reject) => {
      const tokenClient = google.accounts.oauth2.initTokenClient(oauthConfig)
      console.log("initTokenClient complete", tokenClient)
      if (tokenClient) {
        resolve(tokenClient)
      } else {
        reject(new Error("initTokenClient failed"))
      }
    })
  }


}
