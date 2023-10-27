import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserProfile } from 'src/app/interfaces/user-profile';
import ChatMessageService from 'src/app/services/chatDatas/chat-message.service';
import { ContactsService } from 'src/app/services/chatDatas/contacts.service';
import { UserProfilesService } from 'src/app/services/userDatas/user-profiles.service';

@Component({
  selector: 'app-message-window',
  templateUrl: './message-window.component.html',
  styleUrls: ['./message-window.component.scss']
})
export class MessageWindowComponent {
  
  public channelFinderForm: FormGroup = new FormGroup({
    recipient: new FormControl('', [], []),
  });

  foundProfiles : Array<any> = []; 
  searchingUser : boolean = false;
  foundUser : UserProfile | null = null;

  // searchChat = 

  constructor(
    private userProfilesService: UserProfilesService,
    public chatMessageService: ChatMessageService,
    private contactsService: ContactsService,
  ){
    this.channelFinderForm.valueChanges.subscribe(
      this.searchChatMember.bind(this)
    );
  }

  searchChatMember() {
    let member = this.channelFinderForm.value.recipient.toLowerCase();
    if (member !== '') {
      this.foundProfiles = this.userProfilesService.allAppUsers.filter(
        (profile) => profile.userName.toLowerCase().includes(member)
      );
      if (this.foundProfiles.length > 0 && this.foundProfiles) {
        this.searchingUser = true;
      }     
    } 
  }

  /**
   * select user
   * 
   * @param profile 
   */
  async selectChat(profile: UserProfile) {
    this.foundUser = profile;
    this.chatMessageService.selectContact(profile);
    this.chatMessageService.createMessageChannelId();
    this.chatMessageService.messageIsSent = false;
    await this.chatMessageService.waitForMessageIsSent();
    this.clearSearchInput();
  }

  /**
   * deselct the contact user
   */
  deselectContact() {
    this.foundUser = null;
  }

  clearSearchInput() {
    this.channelFinderForm.reset();
    this.foundProfiles = [];
    this.foundUser = null;
  }
}
