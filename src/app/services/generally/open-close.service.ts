import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OpenCloseService {


  sidebarOpen : boolean = true;
  threadOpen : boolean = false;
  navOpen : boolean = false;
  chatHeader: string = 'startHeader';
  threadChannel: {
    name: string,
    id: any
  } | null = null;
  channelMembersOpen: boolean = false;
  openAddChannelMembers: boolean = false;
  imgUploadOpen: boolean = false;
  openImage: boolean = false;
  openOwnProfile: boolean = false;

  chatOrThread !: string;
  searchMessageArray !: Array<string>;
  
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
