import { Injectable } from '@angular/core';
import {environment} from "@env";

declare var gapi: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleApiService {
  private auth2: any;
  private userContacts: any;

  private CLIENT_ID = environment.PLAY_GOLF_UI_CLIENT_ID
  private API_KEY = environment.GOOGLE_API_KEY

  constructor() {
  }

  signIn() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: this.CLIENT_ID,
        cookie_policy: 'single_host_origin',
        scope: 'profile email https://www.googleapis.com/auth/contacts.readonly'
      });
      this.auth2.attachClickHandler(document.getElementById('googleres'), {},
        this.onSignIn,
        this.onFailure
      );
    })
  }

  private onSignIn(res: any | undefined) {
    console.log('onSignIn', JSON.stringify(res))
  }

  private onFailure(res: any ) {
    console.log('onFailure', JSON.stringify(res))
  }

  fetchmail() {
    gapi.load('client:auth2', () => {
      gapi.client.init({
        apiKey: this.API_KEY,
        discoveryDocs: ['https://people.googleapis.com/$discovery/rest?version=v1'],
        clientId: this.CLIENT_ID,
        scope: 'profile email https://www.googleapis.com/auth/contacts.readonly'
      }).then(() => {
        return gapi.client.people.people.connections.list({
          resourceName: 'people/me',
          personFields: 'emailAddresses,names'
        });
      }).then(
        (res: any) => {
          //console.log("Res: " + JSON.stringify(res)); to debug
          this.userContacts.emit(this.transformToMailListModel(res.result));
        },
        // error => console.log("ERROR " + JSON.stringify(error))
      );
    });
  }

  private transformToMailListModel(result: any): any {
    console.log('Result = ', JSON.stringify(result))
    return result;
  }

}
