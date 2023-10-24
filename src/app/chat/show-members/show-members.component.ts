import { Component } from '@angular/core';
import { ContactsService } from 'src/app/services/chatDatas/contacts.service';
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
    private openCloseService: OpenCloseService,
  ) {}

  openContactChat(chat: any) {
    this.contactService.openChatData = chat;
    this.openCloseService.chatHeader = 'contactHeader'
  }
}
