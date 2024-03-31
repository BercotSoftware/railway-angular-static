import {Injectable, NgZone} from "@angular/core";
import {environment} from "@env";
import {BehaviorSubject} from "rxjs";
import {GoogleOAuth2Service} from "./google-oauth2.service";
import {OAUTH2_SCOPES, StringAsScopes} from "./scopes";

declare var gapi: any;
declare var google: any;

// https://developers.google.com/identity/oauth2/web/guides/use-token-model
// https://developers.google.com/people/quickstart/js
// https://stackoverflow.com/questions/38091215/import-gapi-auth2-in-angular-2-typescript


@Injectable({
  providedIn: 'root'
})
export class PeopleApiService {
  public apiReady$ = new BehaviorSubject<boolean>(false)

  grantedScopes : Set<string> = new Set()

  readonly GAPI_CLIENT_CONFIG = {
    'apiKey': environment.GOOGLE_API_KEY,
    'discoveryDocs': ["https://www.googleapis.com/discovery/v1/apis/people/v1/rest"],
  };

  // Authorization scopes required by the API; multiple scopes can be
  // included, separated by spaces.
  readonly GOOGLE_OAUTH2_CONFIG = {
    client_id: environment.PLAY_GOLF_UI_CLIENT_ID,
    scope: OAUTH2_SCOPES.CONTACTS_READONLY,
  }

  constructor(private zone: NgZone, private googleAuthService: GoogleOAuth2Service) {
  }

  /**
   * Perform gapi and gapi client initialization for the people API, it must be called
   * at some point before making client calls
   * @private
   */
  public initializeGapiClient() : Promise<void> {
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
            // console.log("GAPI load complete")
            gapi.client.init(this.GAPI_CLIENT_CONFIG).then(() => {
              // console.log("client init complete")
                  this.apiReady$.next(true)
                  resolve()
            });
          },
        })
      }
    })
  }


  static readonly RESOURCE_CONFIG = {
    'resourceName': 'people/me',
    'pageSize': 100,
    'personFields': 'names,nicknames,emailAddresses,addresses,phoneNumbers',
  }

  /**
   * Retrieve a list of contacts
   */
  getContactList(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      this.initializeGapiClient()
        .then(() => {

          // Function to return people
          const peopleFn = async () => {
            const response = await gapi.client.people.people.connections.list(PeopleApiService.RESOURCE_CONFIG)
            resolve(response.result)
          }

          /**
           * If we already have permission, make the call, otherwise go through
           * the user prompts and call on success
           */
          if (this.grantedScopes.has(OAUTH2_SCOPES.CONTACTS_READONLY)) {
            peopleFn()
          } else {
            const tokenClient = google.accounts.oauth2.initTokenClient({
              client_id: environment.PLAY_GOLF_UI_CLIENT_ID,
              scope: 'https://www.googleapis.com/auth/contacts.readonly',
              callback: (tokenResponse: any) => {
                console.log('Response: ', tokenResponse)
                if (tokenResponse.scope) {
                  const scopes = StringAsScopes(tokenResponse.scope)
                  scopes.forEach(scope => this.grantedScopes.add(scope))
                }

                console.log('Client token: ', gapi.client.getToken())

                if (this.grantedScopes.has(OAUTH2_SCOPES.CONTACTS_READONLY)) {
                  console.log('Permission granted')
                  peopleFn()
                } else {
                  reject('Permission denied')
                }
              }
            })

            // This will fire the event above
            tokenClient.requestAccessToken({prompt: ''})
            //   tokenClient.requestAccessToken({prompt: 'consent'})
          }
        })
        .catch((err) => {
          console.log('Caught error 2')
          reject(err)
        })

    })
  }

  revokePermissions() {
    const token = gapi?.client?.getToken()
    if (token?.access_token) {
      this.grantedScopes.clear()
      google.accounts.oauth2.revoke(token.access_token, (done: any) => {
        console.log(done);
        console.log(done.successful);
        console.log(done.error);
        console.log(done.error_description);
      });

    }
  }
}
