import { Injectable } from '@angular/core';
import {environment} from "@env";

const CLIENT_ID = environment.PLAY_GOLF_UI_CLIENT_ID
const API_KEY = environment.GOOGLE_API_KEY
// Discovery doc URL for APIs used by the quickstart
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/people/v1/rest';

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = 'https://www.googleapis.com/auth/contacts.readonly';


@Injectable({
  providedIn: 'root'
})
export class GoogleApiService {
  private auth2: any;
  private userContacts: any;



  constructor() {
  }

  // fetchmail() {
  //   gapi.load('client:auth2', async () => {
  //     gapi.client.init({
  //       apiKey: API_KEY,
  //       discoveryDocs: ['https://people.googleapis.com/$discovery/rest?version=v1'],
  //       clientId: CLIENT_ID,
  //       scope: 'profile email https://www.googleapis.com/auth/contacts.readonly'
  //     }).then( async () => {
  //       return gapi.client.people.people.connections.list({
  //         resourceName: 'people/me',
  //         personFields: 'emailAddresses,names'
  //       });
  //     }).then(
  //       (res: any) => {
  //         //console.log("Res: " + JSON.stringify(res)); to debug
  //         this.userContacts.emit(this.transformToMailListModel(res.result));
  //       },
  //       // error => console.log("ERROR " + JSON.stringify(error))
  //     );
  //   });
  // }
  //
  // private transformToMailListModel(result: any): any {
  //   console.log('Result = ', JSON.stringify(result))
  //   return result;
  // }

}
