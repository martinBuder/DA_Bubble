import { Component } from '@angular/core';
import { OpenedChannelService } from 'src/app/services/chatDatas/opened-channel.service';
import { ChatHeadDatasService } from 'src/app/services/chatDatas/channel-head-datas.service';
import ChatMessageService from 'src/app/services/chatDatas/chat-message.service';
import { ContactsService } from 'src/app/services/chatDatas/contacts.service';
import { OpenCloseService } from 'src/app/services/generally/open-close.service';
import { FireDatabaseService } from 'src/app/services/firebase/fire-database.service';

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
    public fireDatabaseService: FireDatabaseService,
    public chatMessageService: ChatMessageService,
  ) { }

}
