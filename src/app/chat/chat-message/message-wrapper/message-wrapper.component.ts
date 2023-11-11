import { Component, Input } from '@angular/core';
import { Message } from 'src/app/interfaces/message';
import { FireAuthService } from 'src/app/services/firebase/fire-auth.service';
import { EmojisService } from 'src/app/services/generally/emojis.service';

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

  allEmojis !: Array<any>;
  allEmojisOpen : boolean = false;
  
  toggleEmojis() {
    this.allEmojisOpen = !this.allEmojisOpen;
  }


  constructor(
    public fireAuthService: FireAuthService,
    private emojisService: EmojisService,
    ) {  
      this.allEmojis = this.emojisService.getAllEmoijs();     
    }

    addEmoji(emoji : any, message : any ){
      // hier soll das emoji zu der nachricht hinzugefügt werden
      console.log(emoji);
      console.log(message);
      
      
    }

}
