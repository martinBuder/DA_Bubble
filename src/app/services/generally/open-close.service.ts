import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OpenCloseService {

  threadOpen : boolean = true;
  navOpen : boolean = false;
  chatHeader: string = 'startHeader';
  channelMembersOpen: boolean = false;
  openAddChannelMembers: boolean = false;
  
  constructor() { }

    /**
     * check if item is filled
     */
    async waitForNotNullValue(itemToFill: any,) {
      while (itemToFill=== null) {
        await new Promise(resolve => setTimeout(resolve, 1000)); 
      }      
    }
}
