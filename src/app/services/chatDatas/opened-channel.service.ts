import { Injectable } from '@angular/core';
import { ChatHeadDatasService } from './channel-head-datas.service';
import ChatMessageService from '../chatDatas/chat-message.service';
import { OpenCloseService } from '../generally/open-close.service';

@Injectable({
  providedIn: 'root'
})
export class OpenedChannelService {

  openedChannel : any | null = null;

  constructor(
    public chatHeadDatasService: ChatHeadDatasService,
    private chatMessageService: ChatMessageService,
    private openCloseService: OpenCloseService
  ) { };

  /**
   * open channel and fill the informations
   * 
   * @param channelIndex 
   */
  openChannel(channelIndex : number) {
    this.openCloseService.chatHeader = 'channelHeader';
    this.openedChannel = this.chatHeadDatasService.userChannels[channelIndex];
    this.chatHeadDatasService.channel = this.openedChannel;
    this.chatMessageService.messageChannelId = this.openedChannel.id
    this.chatMessageService.getChannelMessagesList();
  }



 
}
