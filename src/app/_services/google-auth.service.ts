import {Injectable, NgZone} from '@angular/core';
import {HttpClient} from '@angular/common/http';

declare var gapi: any;
declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {
  private tokenClient: any;

  constructor(private zone: NgZone) { }


  public getAccessToken() {
    return new Promise((resolve, reject) => {
      this.zone.run(() => {
        try {
          if (gapi.client.getToken() === null) {
            // Prompt the user to select a Google Account and ask for consent to share their data
            // when establishing a new session.
            this.tokenClient.requestAccessToken({prompt: 'consent'})
          } else {
            // Skip display of account chooser and consent dialog for an existing session.
            this.tokenClient.requestAccessToken({prompt: ''})
          }
        }
        catch (e) {
          console.log('Error retrieving token')
          reject(e)
        }
      })
    })
  }

}
