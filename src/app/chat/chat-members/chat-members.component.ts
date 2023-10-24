import { Component } from '@angular/core';
import { OpenCloseService } from 'src/app/services/generally/open-close.service';
import { OpenedChannelService } from 'src/app/services/chatDatas/opened-channel.service';
import { UserProfilesService } from 'src/app/services/userDatas/user-profiles.service';

@Component({
  selector: 'app-chat-members',
  templateUrl: './chat-members.component.html',
  styleUrls: ['./chat-members.component.scss']
})
export class ChatMembersComponent {

  constructor(
    public openCloseService: OpenCloseService,
    public openedChannelService: OpenedChannelService,
    private userProfilesService: UserProfilesService 
  ) { }

  openMemberProfile(member:any){
    console.log(member);
    this.userProfilesService.contactProfile = member;
    this.userProfilesService.openProfile = true;
  }

}
