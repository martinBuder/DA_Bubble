import { HostListener, Injectable } from '@angular/core';
import { ChatHeadDatasService } from './channel-head-datas.service';
import ChatMessageService from '../chatDatas/chat-message.service';
import { OpenCloseService } from '../generally/open-close.service';
import { FireDatabaseService } from '../firebase/fire-database.service';
import { ChatSiteComponent } from 'src/app/main/chat-site/chat-site.component';
import { SearchService } from './search.service';

@Injectable({
  providedIn: 'root'
})
export class OpenedChannelService{

  @HostListener('window:resize', ['$event'])

  openedChannel : any | null = null;

  constructor(
    public chatHeadDatasService: ChatHeadDatasService,
    private chatMessageService: ChatMessageService,
    private fireDatabaseServie: FireDatabaseService,
    private openCloseService: OpenCloseService,
    private searchService: SearchService
  ) { };

  /**
   * open channel and fill the informations
   * 
   * @param channelIndex 
   */
  async openChannel(channelIndex : number) {
    this.chatMessageService.clearOldChatDatas();
    this.openCloseService.chatHeader = 'channelHeader';
    this.openedChannel = this.fireDatabaseServie.userChannels[channelIndex];   
    this.chatHeadDatasService.channel = this.openedChannel;
    this.chatMessageService.messageChannelId = this.openedChannel.id;
    this.chatMessageService.getChannelMessagesList();
    this.closeSidebar();
  }

  closeSidebar() {
    const maxWidth = 750; // Hier die maximale Breite einstellen
    if (window.innerWidth <= maxWidth) {
      this.openCloseService.sidebarOpen = false;
    }
  }
}
