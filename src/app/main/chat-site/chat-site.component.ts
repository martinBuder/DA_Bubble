import { Component } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { ThreadOpenCloseService } from 'src/app/services/thread-open-close.service';

@Component({
  selector: 'app-chat-site',
  templateUrl: './chat-site.component.html',
  styleUrls: ['./chat-site.component.scss']
})
export class ChatSiteComponent {
  sidebarOpen : boolean = true;


  constructor(
    public threadOpenCloseService: ThreadOpenCloseService,
    public chatService: ChatService,
    ){
    };

}
