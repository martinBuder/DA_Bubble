import { Component } from '@angular/core';
import ChatMessageService from 'src/app/services/chatDatas/chat-message.service';
import { ContactsService } from 'src/app/services/chatDatas/contacts.service';
import { OpenedChannelService } from 'src/app/services/chatDatas/opened-channel.service';
import { FireDatabaseService } from 'src/app/services/firebase/fire-database.service';
import { OpenCloseService } from 'src/app/services/generally/open-close.service';

@Component({
  selector: 'app-show-members',
  templateUrl: './show-members.component.html',
  styleUrls: ['./show-members.component.scss']
})
export class ShowMembersComponent {
  contactsOpen : boolean = true;

  constructor(
    public contactService: ContactsService,
    private chatMessageService: ChatMessageService,
    private openCloseService: OpenCloseService,
    public openedChannelService: OpenedChannelService,
    public fireDatabaseService: FireDatabaseService
  ) {
    
  }

  async openContactChat(chat: any) {  
    this.contactService.openChatData = chat; 
    this.openCloseService.chatHeader = 'contactHeader';
    this.chatMessageService.selectedContact = chat.contact;
    this.chatMessageService.createMessageChannelId();
    await this.chatMessageService.getChannelMessagesList();
  }
}
