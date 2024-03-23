import { Component } from '@angular/core';
import { ChatHeadDatasService } from 'src/app/services/chatDatas/channel-head-datas.service';
import ChatMessageService from 'src/app/services/chatDatas/chat-message.service';
import { OpenedChannelService } from 'src/app/services/chatDatas/opened-channel.service';
import { OpenCloseService } from 'src/app/services/generally/open-close.service';

@Component({
  selector: 'app-sidebar-left',
  templateUrl: './sidebar-left.component.html',
  styleUrls: ['./sidebar-left.component.scss']
})
export class SidebarLeftComponent {

  constructor(
    public chatHeadDatasService: ChatHeadDatasService,
    public openCloseService: OpenCloseService,
    private chatMessageService: ChatMessageService,
    private openChannelService: OpenedChannelService
    ){ };

    openStartHeader(){
      this.chatMessageService.clearOldChatDatas();
      this.openCloseService.chatHeader = 'startHeader';
      this.openChannelService.closeSidebar();
    }

}
