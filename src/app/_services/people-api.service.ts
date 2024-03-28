import {Injectable, NgZone} from "@angular/core";
import {environment} from "@env";

declare var gapi: any;

// See https://developers.google.com/people/quickstart/js

const CLIENT_ID = environment.PLAY_GOLF_UI_CLIENT_ID
const API_KEY = environment.GOOGLE_API_KEY

// Discovery doc URL for APIs used by the quickstart
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/people/v1/rest';

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const CONTACTS_READ_SCOPE = 'https://www.googleapis.com/auth/contacts.readonly';


@Injectable({
  providedIn: 'root'
})
export class PeopleApiService {
  private userContacts: any;
  private gapiInitialized: boolean;
  private zone = new NgZone({})

  constructor() {
  }


  // see: https://stackoverflow.com/questions/38091215/import-gapi-auth2-in-angular-2-typescript

  loadClient(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.zone.run(() => {
        gapi.load('client', {
          callback: resolve,
          onerror: reject,
          ontimeout: reject,
          timeout: 1000, // 5 seconds
        })
      })
    })
  }

  initClient(): Promise<any> {
    const CLIENT_CONFIG = {
      'apiKey': API_KEY,
      'discoveryDocs': [DISCOVERY_DOC],
    };

    return new Promise((resolve, reject) => {
      this.zone.run(() => {
        gapi.client.init(CLIENT_CONFIG).then(resolve, reject);
      });
    });
  }


}
