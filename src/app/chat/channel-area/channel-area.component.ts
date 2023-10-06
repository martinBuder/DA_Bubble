import { Component } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-channel-area',
  templateUrl: './channel-area.component.html',
  styleUrls: ['./channel-area.component.scss']
})
export class ChannelAreaComponent {
  channelsOpen : boolean = true;

  constructor(
    public chatService: ChatService
    ){};

  openChannel(channelId : string) {

  }

}
