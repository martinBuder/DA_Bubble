import { Component } from '@angular/core';
import ChatMessageService from 'src/app/services/chatDatas/chat-message.service';
import { OpenCloseService } from 'src/app/services/generally/open-close.service';

@Component({
  selector: 'app-thread-right',
  templateUrl: './thread-right.component.html',
  styleUrls: ['./thread-right.component.scss']
})
export class ThreadRightComponent {

  constructor(
    public openCloseService: OpenCloseService,
    public chatMessageService: ChatMessageService
  ){
     
    };


}
