import { Injectable } from '@angular/core';
import { ChatService } from './chat.service';

@Injectable({
  providedIn: 'root'
})
export class OpenedChannelService {

  openedChannel : any | null = null;
  openChatMembers : boolean = false;
  openAddChatMembers : boolean = false;

  constructor(
    public chatService: ChatService,
  ) { };

  openChannel(channelIndex : number) {
    this.openedChannel = this.chatService.userChannels[channelIndex];
    console.log(this.openedChannel);
  }
}
