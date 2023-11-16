import { Component } from '@angular/core';
import { OpenedChannelService } from 'src/app/services/chatDatas/opened-channel.service';
import { ChatHeadDatasService } from 'src/app/services/chatDatas/channel-head-datas.service';
import { FireDatabaseService } from 'src/app/services/firebase/fire-database.service';


@Component({
  selector: 'app-channel-area',
  templateUrl: './channel-area.component.html',
  styleUrls: ['./channel-area.component.scss']
})
export class ChannelAreaComponent {
  channelsOpen : boolean = true;

  constructor(
    public openedChannelService: OpenedChannelService,
    public fireDatabaseService: FireDatabaseService,
    public chatHeadDatasService: ChatHeadDatasService,
  ) { 
    this.chatHeadDatasService.getChannelList();
    this.chatHeadDatasService.fillMembersDataInChannel();
  };

}
