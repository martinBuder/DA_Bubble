import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckInSiteServiceService {
  static changeCheckInSite(arg0: string) {
    throw new Error('Method not implemented.');
  }

  checkInSite: string = 'logIn';

  changeCheckInSite(newSite: string) {
    this.checkInSite = newSite;
  }

  constructor() { }
}
