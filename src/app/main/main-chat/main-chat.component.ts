import { Component } from '@angular/core';
import { OpenedChannelService } from 'src/app/services/opened-channel.service';
import { ChatHeadDatasService } from 'src/app/services/channel-head-datas.service';
import ChatMessageService from 'src/app/services/chat-message.service';
import { ContactsService } from 'src/app/services/contacts.service';

@Component({
  selector: 'app-main-chat',
  templateUrl: './main-chat.component.html',
  styleUrls: ['./main-chat.component.scss']
})
export class MainChatComponent {

  whichChatHeader: string = 'start';

  constructor(
    public chatHeadDatasService: ChatHeadDatasService,
    public openedChannelService: OpenedChannelService,
    public chatMessageService: ChatMessageService,
    ) { }

}
