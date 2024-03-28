import {Injectable, NgZone} from "@angular/core";
import {environment} from "@env";
import {BehaviorSubject} from "rxjs";

declare var gapi: any;
declare var google: any;

// See https://developers.google.com/people/quickstart/js

const CLIENT_ID = environment.PLAY_GOLF_UI_CLIENT_ID
const API_KEY = environment.GOOGLE_API_KEY

// Discovery doc URL for APIs used by the quickstart
const PEOPLE_API_DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/people/v1/rest';

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const CONTACTS_READ_SCOPE = 'https://www.googleapis.com/auth/contacts.readonly';


@Injectable({
  providedIn: 'root'
})
export class PeopleApiService {
  private userContacts: any;
  private gapiInitialized: boolean;
  private tokenClient: any;
  private zone = new NgZone({})

  public apiReady$ = new BehaviorSubject<boolean>(false)

  constructor() {
    this.loadClient()
      .then((result) => {
          console.log('GAPI loaded')
          return this.initClient()
        },
        error => {
          console.log('GAPI load failed')
        }
      ).then((result) => {
        console.log('GAPI api is ready')
        return this.loadGis()
      },
      error => {
        console.log('GAPI api init failed')
      }
    ).then((result) => {
      this.apiReady$.next(true)
    })
  }


  // see: https://stackoverflow.com/questions/38091215/import-gapi-auth2-in-angular-2-typescript

  private loadClient(): Promise<boolean> {
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

  private initClient(): Promise<any> {
    const CLIENT_CONFIG = {
      'apiKey': API_KEY,
      'discoveryDocs': [PEOPLE_API_DISCOVERY_DOC],
    };

    return new Promise((resolve, reject) => {
      this.zone.run(() => {
        gapi.client.init(CLIENT_CONFIG).then(resolve, reject);
      });
    });
  }

  private loadGis() : Promise<any> {
    return new Promise((resolve, reject) => {
      this.zone.run(() => {
        this.tokenClient = google.accounts.oauth2.initTokenClient({
          client_id: CLIENT_ID,
          scope: [CONTACTS_READ_SCOPE],
          callback: resolve,
          onerror: reject,
        })
      })
    })
  }

  loadContacts() : Promise<any> {
    return new Promise((resolve, reject) => {
      this.zone.run(async () => {

        try {
          // Fetch first 10 files
          const result = await gapi.client.people.people.connections.list({
            'resourceName': 'people/me',
            'pageSize': 10,
            'personFields': 'names,emailAddresses',
          })
          resolve(result)
        }
        catch (e) {
          reject(e)
        }
      })
    })
  }

}
