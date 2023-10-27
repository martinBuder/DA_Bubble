import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserProfile } from 'src/app/interfaces/user-profile';
import ChatMessageService from 'src/app/services/chatDatas/chat-message.service';
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

  // searchChat = 

  constructor(
    private userProfilesService: UserProfilesService,
    public chatMessageService: ChatMessageService
  ){
    this.channelFinderForm.valueChanges.subscribe(
      this.searchChatMember.bind(this)
    );
  }

  searchChatMember() {
    console.log(this.channelFinderForm.value.recipient);
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

  selectChat( selectedId: any) {

    console.log(selectedId);
    

  }
}
