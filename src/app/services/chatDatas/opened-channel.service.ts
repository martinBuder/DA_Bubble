import { Injectable } from '@angular/core';
import { ChatHeadDatasService } from './channel-head-datas.service';
import ChatMessageService from '../chatDatas/chat-message.service';
import { OpenCloseService } from '../generally/open-close.service';
import { FireDatabaseService } from '../firebase/fire-database.service';

@Injectable({
  providedIn: 'root'
})
export class OpenedChannelService {

  openedChannel : any | null = null;

  constructor(
    public chatHeadDatasService: ChatHeadDatasService,
    private chatMessageService: ChatMessageService,
    private fireDatabaseServie: FireDatabaseService,
    private openCloseService: OpenCloseService
  ) { };

  /**
   * open channel and fill the informations
   * 
   * @param channelIndex 
   */
  openChannel(channelIndex : number) {
    this.fireDatabaseServie.channelMessages = [];
    this.openCloseService.chatHeader = 'channelHeader';
    this.openedChannel = this.fireDatabaseServie.userChannels[channelIndex];   
    this.chatHeadDatasService.channel = this.openedChannel;
    this.chatMessageService.messageChannelId = this.openedChannel.id;
    this.chatMessageService.getChannelMessagesList();
  }



 
}
