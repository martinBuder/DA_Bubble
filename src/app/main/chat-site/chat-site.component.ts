import { Component } from '@angular/core';
import { ThreadOpenCloseService } from 'src/app/services/thread-open-close.service';

@Component({
  selector: 'app-chat-site',
  templateUrl: './chat-site.component.html',
  styleUrls: ['./chat-site.component.scss']
})
export class ChatSiteComponent {
  sidebarOpen : boolean = true;

  constructor(public threadOpenCloseService: ThreadOpenCloseService){};

}
