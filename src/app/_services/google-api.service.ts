import { Injectable } from '@angular/core';
import {environment} from "@env";

// See https://developers.google.com/people/quickstart/js

const CLIENT_ID = environment.PLAY_GOLF_UI_CLIENT_ID
const API_KEY = environment.GOOGLE_API_KEY
// Discovery doc URL for APIs used by the quickstart
 const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/people/v1/rest';

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = 'https://www.googleapis.com/auth/contacts.readonly';

declare var gapi: any;


@Injectable({
  providedIn: 'root'
})
export class GoogleApiService {
  private userContacts: any;
  private gapiInitialized: boolean;

  constructor() {
  }

  gapiLoad() : Promise<boolean> {
    return new Promise( (resolve, reject) => {
      gapi.load('client', async () => {
        try {
          await gapi.client.init({
            apiKey: API_KEY,
            discoveryDocs: [DISCOVERY_DOC],
          })
          this.gapiInitialized = true
          resolve(true)
        } catch (e) {
          reject(e)
        }
      })

    })
  }


}
