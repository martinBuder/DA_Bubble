import { Component } from '@angular/core';
import { OpenedChannelService } from 'src/app/services/opened-channel.service';
import { ChatHeadDatasService } from 'src/app/services/channel-head-datas.service';
import ChatMessageService from 'src/app/services/chat-message.service';
import { ContactsService } from 'src/app/services/contacts.service';
import { OpenCloseService } from 'src/app/services/open-close.service';

@Component({
  selector: 'app-main-chat',
  templateUrl: './main-chat.component.html',
  styleUrls: ['./main-chat.component.scss']
})
export class MainChatComponent {

  whichChatHeader: string = 'start';

  constructor(
    public openCloseService: OpenCloseService,
    public chatHeadDatasService: ChatHeadDatasService,
    public openedChannelService: OpenedChannelService,
    public contactService: ContactsService,
    public chatMessageService: ChatMessageService,
  ) { }

}
