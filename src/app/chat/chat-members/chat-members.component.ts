import { Component } from '@angular/core';
import { OpenedChannelService } from 'src/app/services/opened-channel.service';
import { UserProfilesService } from 'src/app/services/user-profiles.service';

@Component({
  selector: 'app-chat-members',
  templateUrl: './chat-members.component.html',
  styleUrls: ['./chat-members.component.scss']
})
export class ChatMembersComponent {

  constructor(
    public openedChannelService: OpenedChannelService,
    private userProfilesService: UserProfilesService 
  ) {
    this.openedChannelService.openChatMembers = false
  }

  openMemberProfile(member:any){
    console.log(member);
    this.userProfilesService.contactProfile = member;
    this.userProfilesService.openProfile = true;
  }

}
