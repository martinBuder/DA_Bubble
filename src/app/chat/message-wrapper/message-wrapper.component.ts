import { Component, Input } from '@angular/core';
import { Message } from 'src/app/interfaces/message';
import { UserDatasService } from 'src/app/services/user-datas.service';

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
    reactions: 'null',
    text: 'null'
  }

  constructor(
    public userDatasService: UserDatasService,
    ) { }

}
