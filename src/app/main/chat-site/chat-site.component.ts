import { Component } from '@angular/core';
import { ChatHeadDatasService } from 'src/app/services/channel-head-datas.service';
import { OpenCloseService } from 'src/app/services/open-close.service';
import { UserProfilesService } from 'src/app/services/user-profiles.service';

@Component({
  selector: 'app-chat-site',
  templateUrl: './chat-site.component.html',
  styleUrls: ['./chat-site.component.scss']
})
export class ChatSiteComponent {
  sidebarOpen : boolean = true;


  constructor(
    public openCloseService: OpenCloseService,
    public chatHeadDatasService: ChatHeadDatasService,
    public userProfilesService: UserProfilesService
    ){
    };

}
