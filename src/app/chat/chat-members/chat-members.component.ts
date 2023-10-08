import { Component } from '@angular/core';
import { OpenedChannelService } from 'src/app/services/opened-channel.service';

@Component({
  selector: 'app-chat-members',
  templateUrl: './chat-members.component.html',
  styleUrls: ['./chat-members.component.scss']
})
export class ChatMembersComponent {

  constructor(
    public openedChannelService: OpenedChannelService,
  ) {}

}
