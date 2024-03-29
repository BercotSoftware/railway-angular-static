import {Injectable, NgZone} from '@angular/core';

declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {

  constructor(private zone: NgZone) { }

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
