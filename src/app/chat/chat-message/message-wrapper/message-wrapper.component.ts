import { Component, Input } from '@angular/core';
import { Firestore, collection } from '@angular/fire/firestore';
import { Message } from 'src/app/interfaces/message';
import ChatMessageService from 'src/app/services/chatDatas/chat-message.service';
import { FireAuthService } from 'src/app/services/firebase/fire-auth.service';
import { FireDatabaseService } from 'src/app/services/firebase/fire-database.service';
import { EmojisService } from 'src/app/services/generally/emojis.service';

@Component({
  selector: 'app-message-wrapper',
  templateUrl: './message-wrapper.component.html',
  styleUrls: ['./message-wrapper.component.scss']
})
export class MessageWrapperComponent {

  @Input() message !: Message 

  allEmojis !: Array<any>;
  allEmojisOpen : boolean = false;
  
  toggleEmojis() {
    this.allEmojisOpen = !this.allEmojisOpen;
  }


  constructor(
    private firestore: Firestore,
    public fireAuthService: FireAuthService,
    private fireDatabaseService: FireDatabaseService,
    private chatMessageService: ChatMessageService,
    private emojisService: EmojisService,
    ) {  
      this.allEmojis = this.emojisService.getAllEmoijs();     
    }

    async addEmoji(emoji : any, message : any ){
      const chatMessagesListCollection = collection(
        this.firestore,
        this.chatMessageService.messageChannelId
      );    
      await this.setEmojiDatas(emoji, message)
      this.fireDatabaseService.updateFireItem(chatMessagesListCollection, message.fireId, message)
    }

    async setEmojiDatas(emoji : any, message : any ) {
      let emojiItem 
      let emojiIndex = message.reactions.findIndex((reaction: { item: any; }) => reaction.item === emoji);
      if(emojiIndex === -1) {
        emojiItem = {
          item: emoji,
          amount: 1,
        };
        message.reactions.push(emojiItem);
      }else{
        message.reactions[emojiIndex].amount++;
      }
    }

}
