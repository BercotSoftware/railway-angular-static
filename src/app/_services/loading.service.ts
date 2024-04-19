import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor() { }

  public next(visible: boolean) {
    // do nothing as of yet
  }

  public loading() {
    // Do nothing
  }

  public complete() {
    // Not yet
  }

}
