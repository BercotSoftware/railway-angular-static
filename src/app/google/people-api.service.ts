/// <reference types="@maxim_mazurok/gapi.client.people-v1" />

import {Injectable, NgZone} from "@angular/core";
import {environment} from "@env";
import {BehaviorSubject} from "rxjs";
import {GoogleOAuth2Service} from "./google-oauth2.service";
import {OAUTH2_SCOPES, ScopesAsString, StringAsScopes} from "./scopes";

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

  /**
   * Retrieve a list of contacts
   */
  getContactList(): Promise<any[]> {
    return new Promise(async (resolve, reject) => {
      this.initializeGapiClient()
        .then(() => {

          // Function to return people
          const peopleFn = async () => {
            const contacts = await this._getAllContacts()
            resolve(contacts)
          }

          /**
           * If we already have permission, make the call, otherwise go through
           * the user prompts and call on success
           */
          if (this.grantedScopes.has(OAUTH2_SCOPES.CONTACTS_READONLY)) {
            peopleFn()
          } else {

            // Ask for these scopes
            const requestedScopes = [
              OAUTH2_SCOPES.CONTACTS_READONLY,
              // OAUTH2_SCOPES.CONTACTS_OTHER_READONLY,
            ]

            const tokenClient = google.accounts.oauth2.initTokenClient({
              client_id: environment.PLAY_GOLF_UI_CLIENT_ID,
              scope: ScopesAsString(requestedScopes),
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

  /**
   * After going through all the authentication stuff this is the logic to
   * retrieve all connections, not sure if it coule be simplified to do
   * an initial retrieval then next next, etc
   * @private
   */
  private async _getAllContacts() {
    let contacts: any[] = []
    let request = {
      resourceName: 'people/me',
      pageSize: 100,
      personFields: 'names,nicknames,emailAddresses,addresses,phoneNumbers',
      requestSyncToken: true,
      syncToken: undefined,
      pageToken: undefined,
    }



    let response = await gapi.client.people.people.connections.list(request)
    contacts = response?.result?.connections || []

    while (response?.result?.nextPageToken) {
      request.syncToken = response.result.syncToken
      request.pageToken = response.result.nextPageToken

      response = await gapi.client.people.people.connections.list(request)
      response?.result?.connections?.forEach((contact: any) => {
        contacts.push(contact)
      })
    }

    return contacts
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
