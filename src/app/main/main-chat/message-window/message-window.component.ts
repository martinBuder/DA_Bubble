import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ChannelConfig } from 'src/app/interfaces/channel-config';
import { UserProfile } from 'src/app/interfaces/user-profile';
import { ChatHeadDatasService } from 'src/app/services/chatDatas/channel-head-datas.service';
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

  foundChannels : Array<any> = [];
  searchingChannel : boolean = false;
  foundChannel : ChannelConfig | null = null;


  // searchChat = 

  constructor(
    private userProfilesService: UserProfilesService,
    private chatHeadDatasService: ChatHeadDatasService,
    public chatMessageService: ChatMessageService,
    private contactsService: ContactsService,
  ){
    this.channelFinderForm.valueChanges.subscribe(
      this.searchChatMember.bind(this)
    );
  }

  /**
   * fill the chat members with the correct profiles
   */
  searchChatMember() {
    let searchedChat = this.channelFinderForm.value.recipient;
    if (searchedChat.length > 0) {
      let firstPos = searchedChat.charAt(0);
      if(firstPos === '#' || '@')
        searchedChat = searchedChat.slice(1);
      if(firstPos === '@') 
        this.searchContact(searchedChat)        
      if(firstPos === '#') 
        this.searchChannel(searchedChat)
    } 
  }

  /**
   * search the channel
   * 
   * @param searchedChat input
   */
  searchChannel(searchedChat : string){
    this.foundChannels = this.chatHeadDatasService.userChannels.filter(
      (profile: any ) => profile.channelName.toLowerCase().includes(searchedChat.toLowerCase()),     
    );
    if (this.foundChannels.length > 0) 
      this.searchingChannel = true;
    if (searchedChat.length < 1)
      this.searchingChannel = false
  }

  /**
   * search the contact 
   * 
   * @param searchedChat input 
   */
  searchContact(searchedChat : string){
    this.foundProfiles = this.userProfilesService.allAppUsers.filter(
      (profile) => profile.userName.toLowerCase().includes(searchedChat.toLowerCase())
    );
    if (this.foundProfiles.length > 0) 
      this.searchingUser = true;
    if (searchedChat.length < 1) 
      this.searchingUser = false;
  }

  /**
   * select user
   * 
   * @param profile 
   */
  async selectChat(profile: UserProfile) {
    this.foundUser = profile;
    this.chatMessageService.selectContact(profile);
    await this.chatMessageService.createMessageChannelId();
    this.chatMessageService.messageIsSent = false;
    await this.chatMessageService.waitForMessageIsSent();
    this.clearSearchInput();
  }

  async selectChannel(channel: ChannelConfig) {
    this.foundChannel = channel;
    this.chatMessageService.messageIsSent = false;
    // console.log(this.foundChannel);
    // await this.chatMessageService.waitForMessageIsSent();
    // this.clearSearchInput();

    
  }

  /**
   * deselct the contact user
   */
  deselect() {
    this.foundUser = null;
    this.foundChannel = null;
  }

  /**
   * clear the contact search field
   */
  clearSearchInput() {
    this.channelFinderForm.reset();
    this.foundProfiles = [];
    this.foundUser = null;
    this.foundChannels = [];
    this.foundChannel = null;
  }
}
