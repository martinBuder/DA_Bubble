import { Component } from '@angular/core';
import ChatMessageService from 'src/app/services/chatDatas/chat-message.service';
import { OpenCloseService } from 'src/app/services/generally/open-close.service';
import { UserProfilesService } from 'src/app/services/userDatas/user-profiles.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  
  constructor(
    private openCloseService: OpenCloseService,
    public userProfilesService: UserProfilesService,
    private chatMessageService: ChatMessageService
    ){ }

  writeMessage(contactProfile : any) {
    this.userProfilesService.openProfile = false;
    this.openCloseService.chatHeader = 'startHeader';
    this.chatMessageService.selectedContact = contactProfile;
    this.chatMessageService.findChatForMessage();
    contactProfile = null;
  }
}
