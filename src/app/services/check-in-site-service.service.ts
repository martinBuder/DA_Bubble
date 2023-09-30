import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckInSiteServiceService {
  
  checkInSite: string = 'resetEmail';

  changeCheckInSite(newSite: string) {
    this.checkInSite = newSite;
  }

  constructor() { }
}
