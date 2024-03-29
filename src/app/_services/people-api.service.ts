import {Injectable, NgZone} from "@angular/core";
import {environment} from "@env";
import {BehaviorSubject} from "rxjs";
import {GoogleOAuth2Service} from "./google-oauth2.service";

declare var gapi: any;

// See https://developers.google.com/people/quickstart/js



@Injectable({
  providedIn: 'root'
})
export class PeopleApiService {
  public apiReady$ = new BehaviorSubject<boolean>(false)
  private tokenClient: any;

  readonly GAPI_CLIENT_CONFIG = {
    'apiKey': environment.GOOGLE_API_KEY,
    'discoveryDocs': ["https://www.googleapis.com/discovery/v1/apis/people/v1/rest"],
  };

  // Authorization scopes required by the API; multiple scopes can be
  // included, separated by spaces.
  readonly GOOGLE_OAUTH2_CONFIG = {
    client_id: environment.PLAY_GOLF_UI_CLIENT_ID,
    scope: 'https://www.googleapis.com/auth/contacts.readonly',
  }

  constructor(private zone: NgZone, private googleAuthService: GoogleOAuth2Service) {
  }

  /**
   * Perform gapi and gapi client initialization for the people API
   * @private
   */
  private initializeApi() : Promise<void> {
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
            gapi.client.init(this.GAPI_CLIENT_CONFIG).then(() => {
              console.log("client init complete")

              this.googleAuthService.getTokenClient(this.GOOGLE_OAUTH2_CONFIG)
                .then((result) => {
                  this.tokenClient = result
                  this.apiReady$.next(true)
                  console.log("Token client ready")
                  resolve()
                })
                .catch((err) => {
                  console.log("Token client failed")
                  reject(err)
                })
            });
          },
        })
      }
    })
  }


  // see: https://stackoverflow.com/questions/38091215/import-gapi-auth2-in-angular-2-typescript

  static readonly RESOURCE_CONFIG = {
    'resourceName': 'people/me',
    'pageSize': 100,
    'personFields': 'names,nicknames,emailAddresses,addresses,phoneNumbers',
  }

  getContactList(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      this.initializeApi()
        .then(() => {
          if (gapi.client.getToken() === null) {
            // Prompt the user to select a Google Account and ask for consent to share their data
            // when establishing a new session.
            this.tokenClient.requestAccessToken({prompt: 'consent'})
          } else {
            // Skip display of account chooser and consent dialog for an existing session.
            this.tokenClient.requestAccessToken({prompt: ''})
          }

          const result = gapi.client.people.people.connections.list(PeopleApiService.RESOURCE_CONFIG)
          resolve(result)
        })
        .catch((err) => {
          console.log('Caught error 2')
          reject(err)
        })

    })
  }

}
