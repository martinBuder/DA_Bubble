import { Component } from '@angular/core';
import { OpenedChannelService } from 'src/app/services/opened-channel.service';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-main-chat',
  templateUrl: './main-chat.component.html',
  styleUrls: ['./main-chat.component.scss']
})
export class MainChatComponent {

  constructor(
    public chatService: ChatService,
    public openedChannelService: OpenedChannelService,
    ) { }

  
}
