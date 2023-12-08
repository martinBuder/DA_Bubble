import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckInSiteServiceService {
  
  checkInSite: string = 'chooseAvatar';

  changeCheckInSite(newSite: string) {
    this.checkInSite = newSite;
  }

  constructor() { }
}
