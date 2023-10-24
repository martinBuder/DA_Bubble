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
}
