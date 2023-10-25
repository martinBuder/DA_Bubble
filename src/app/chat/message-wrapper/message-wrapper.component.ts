import { Component, Input } from '@angular/core';
import { Message } from 'src/app/interfaces/message';
import { FireAuthService } from 'src/app/services/firebase/fire-auth.service';

@Component({
  selector: 'app-message-wrapper',
  templateUrl: './message-wrapper.component.html',
  styleUrls: ['./message-wrapper.component.scss']
})
export class MessageWrapperComponent {

  @Input() message : Message = 	{ 
    timestamp: 'null',
    date: 'null',
    time: 'null',
    year: 'null',
    writerName: 'null',
    writerImg: 'null',
    writerId: 'null',
    reactions: 'null',
    text: 'null',
  }

  constructor(
    public fireAuthService: FireAuthService,
    ) { }

}
