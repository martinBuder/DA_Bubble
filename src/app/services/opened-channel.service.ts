import { Injectable } from '@angular/core';
import { ChatHeadDatasService } from './chat-head-datas.service';
import ChatMessageService from './chat-message.service';

@Injectable({
  providedIn: 'root'
})
export class OpenedChannelService {

  openedChannel : any | null = null;
  openChatMembers : boolean = false;
  openAddChatMembers : boolean = false;

  constructor(
    public chatHeadDatasService: ChatHeadDatasService,
    private chatMessageService: ChatMessageService
  ) { };

  openChannel(channelIndex : number) {
    this.openedChannel = this.chatHeadDatasService.userChannels[channelIndex];
    this.chatMessageService.messageChannelId = this.openedChannel.id
    this.chatMessageService.addFireMessage();
    
  }
}
