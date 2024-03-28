import {Injectable, NgZone} from "@angular/core";
import {environment} from "@env";
import {BehaviorSubject} from "rxjs";
import {error} from "@angular/compiler-cli/src/transformers/util";

declare var gapi: any;
declare var google: any;

// See https://developers.google.com/people/quickstart/js



@Injectable({
  providedIn: 'root'
})
export class PeopleApiService {
  public apiReady$ = new BehaviorSubject<boolean>(false)
  private tokenClient: any;

  readonly CLIENT_ID = environment.PLAY_GOLF_UI_CLIENT_ID
  readonly API_KEY = environment.GOOGLE_API_KEY

  // Discovery doc URL for APIs used by the quickstart
  readonly PEOPLE_API_DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/people/v1/rest';

  // Authorization scopes required by the API; multiple scopes can be
  // included, separated by spaces.
  readonly CONTACTS_READ_SCOPE = 'https://www.googleapis.com/auth/contacts.readonly';

  readonly CLIENT_CONFIG = {
    'apiKey': this.API_KEY,
    'discoveryDocs': [this.PEOPLE_API_DISCOVERY_DOC],
  };

  readonly OAUTH2_CONFIG = {
    client_id: this.CLIENT_ID,
    scope: this.CONTACTS_READ_SCOPE,
  }

  constructor(private zone: NgZone) {
  }

  public initializeApi(): Promise<any> {
    return new Promise<void>((resolve, reject) => {
      this.gapiInit()
        .then(() => {
          this.tokenClient = google.accounts.oauth2.initTokenClient(this.OAUTH2_CONFIG)
          console.log("initTokenClient complete", this.tokenClient)
          resolve()
        })
        .catch((err) => {
          console.log('initTokenClient failed')
          reject(err)
        })
    })
  }

  private gapiInit() : Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.apiReady$.value) {
        console.log("GAPI already loaded")
        resolve()
      } else {
        gapi.load('client', {
          onerror: reject,
          ontimeout: reject,
          timeout: 1000, // 5 seconds
          callback: () => {
            console.log("GAPI load complete")
            gapi.client.init(this.CLIENT_CONFIG).then(() => {
              console.log("client init complete")
              this.apiReady$.next(true)
              resolve()
            });
          },
        })

      }
    })
  }



  // see: https://stackoverflow.com/questions/38091215/import-gapi-auth2-in-angular-2-typescript

  getContactList(): Promise<any> {
    return new Promise(async (resolve, reject) => {

      return this.getAccessToken()
        .then((result) => {

          console.log('got access token...', result)
          try {
            const REQUEST_CONFIG = {
              'resourceName': 'people/me',
              'pageSize': 100,
              'personFields': 'names,nicknames,emailAddresses,addresses,phoneNumbers',
            }

            const result = gapi.client.people.people.connections.list(REQUEST_CONFIG)
            resolve(result)
          } catch (e) {
            console.log('Error retrieving token')
            reject(e)
          }

        })
        .catch((error) => {
          console.log('Error retrieving list')
          reject(error)
        })

    })
  }

  private getAccessToken() {
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
        } catch (e) {
          console.log('Error retrieving token')
          reject(e)
        }
      })
    })
  }

}
