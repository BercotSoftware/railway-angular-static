import { Injectable, NgZone, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {ProfileDetails} from "@golf-api";
import {environment} from "@env";

declare var gapi: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {
  public auth2: any;
  public user$: BehaviorSubject<ProfileDetails> = new BehaviorSubject<ProfileDetails>({});
  public isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoaded$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private zone: NgZone, private http: HttpClient) { }

  validateToken(token: string): Observable<ProfileDetails> {
    return this.http.get<ProfileDetails>(`${environment.PLAY_GOLF_API_URL}/validateToken/${token}`);
  }

  signIn(): void {
    this.auth2.signIn().then((user: any) => {
      this.validateToken(user.getAuthResponse().id_token).subscribe((user: any) => {
          this.zone.run(() => {
            this.user$.next(user);
            this.isLoggedIn$.next(true);
          });
        },
        (err: any) => {
          console.error(err);
        });
    });
  };

  signOut(): void {
    this.auth2.signOut().then(() => {
        this.zone.run(() => {
          this.isLoggedIn$.next(false);
          this.user$.next({});
        });
      },
      (err: any) => {
        console.error(err);
      });
  }

  loadAuth2(): void {
    gapi.load('auth2', () => {
      gapi.auth2.init({
        client_id: `${environment.PLAY_GOLF_UI_CLIENT_ID}`,
        fetch_basic_profile: true
      }).then((auth: any) => {
          this.zone.run(() => {
            this.auth2 = auth;
            this.isLoaded$.next(true);
          });
        },
      );
    });
  }
}
