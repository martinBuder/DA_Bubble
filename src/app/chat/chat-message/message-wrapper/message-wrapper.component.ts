import { Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { Firestore, collection } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  @Input() message !: Message;

  allEmojis !: Array<any>;
  allEmojisOpen : boolean = false;
  editMessageWindow : boolean = false;
  textMessage !: string; 
  
  toggleEmojis() {
    this.allEmojisOpen = !this.allEmojisOpen;
  }

  public textfieldForm : FormGroup = new FormGroup({
   
    textarea: new FormControl ('', [
      Validators.required,
    ], []),

  });


  constructor(
    private firestore: Firestore,
    private elementRef: ElementRef,
    public fireAuthService: FireAuthService,
    private fireDatabaseService: FireDatabaseService,
    private chatMessageService: ChatMessageService,
    private emojisService: EmojisService,
    ) {  
      this.allEmojis = this.emojisService.getAllEmoijs();     
    }


    @HostListener('document:click', ['$event'])
    onClickOutside(event: Event) {
      if (!this.elementRef.nativeElement.contains(event.target))
        this.allEmojisOpen = false;
    }


    /**
     * start - the way to add or remove a emoji to a message
     * 
     * @param emoji 
     * @param message 
     */
    async addEmoji(emoji : any, message : any ){
      const chatMessagesListCollection = collection(
        this.firestore,
        this.chatMessageService.messageChannelId
      );    
      await this.setEmojiDatas(emoji, message)
      this.fireDatabaseService.updateFireItem(chatMessagesListCollection, message.fireId, message)
    }

    /**
     * set the emoji datas to update
     * 
     * @param emoji 
     * @param message 
     */
    async setEmojiDatas(emoji : any, message : any ) {
      let emojiIndex = message.reactions.findIndex((reaction: { item: any; }) => reaction.item === emoji);
      if(emojiIndex === -1) {
        message.reactions.push(this.setFirstEmojiJson(emoji));
      }else{
        let reactionUserIndex = message.reactions[emojiIndex].reactionUsers.findIndex((user: {userId: any}) => user.userId == this.fireAuthService.fireUser.uid);
        this.updateMessageEmojis(reactionUserIndex, message, emojiIndex);
      }
    }

    /**
     * if the user isn't in reactions User add the emoji, else take one emoji away
     * 
     * @param reactionUserIndex is the index of this user in message.emoji.reactionUsers
     * @param message this message
     * @param emojiIndex is the index of this emoji in message.emoji 
     */
    updateMessageEmojis(reactionUserIndex: number, message: Message, emojiIndex: number) {
      if(reactionUserIndex === -1) {
        message.reactions[emojiIndex].amount++;
        message.reactions[emojiIndex].reactionUsers.push(this.setReactionUser());
      }
      else {
        message.reactions[emojiIndex].amount--;
        this.spliceMessageEmoji(reactionUserIndex, message, emojiIndex);
      }
    }    

    /**
     * splice the user, who reacted or/and the emoji if the amount goes under 1
     * 
     * @param reactionUserIndex is the index of this user in message.emoji.reactionUsers
     * @param message this message
     * @param emojiIndex is the index of this emoji in message.emoji
     */
    spliceMessageEmoji(reactionUserIndex: number, message: Message, emojiIndex: number) {
      if (message.reactions[emojiIndex].amount > 0) {
        message.reactions[emojiIndex].reactionUsers.splice(reactionUserIndex, 1);
      } else {
        message.reactions.splice(emojiIndex, 1)
      }
    }

    /**
     * set the first json for each emoji, which is a new reaction on this message
     * 
     * @param emoji 
     * @returns 
     */
    setFirstEmojiJson(emoji: any) {
      return {
        item: emoji,
        amount: 1,
        reactionUsers: [this.setReactionUser()]
      };
    }

    /**
     * 
     * @returns reacted user (actually user) with the datas we need 
     */
    setReactionUser() {
      return  {
        name: this.fireAuthService.fireUser.displayName,
        userId: this.fireAuthService.fireUser.uid
      }
    }

    
    answerToMessage(message: any) {

    }

    // * edit messeage

    editMessage(message: any) {      
      this.textfieldForm.get('textarea')?.setValue(message.text)
      this.editMessageWindow = true;
  
    }

    async saveEditMessage(input : string) {      
      this.message.text = input;
      this.message.editedMessage = true;
      const chatMessagesListCollection = collection(
        this.firestore,
        this.chatMessageService.messageChannelId
      );    
      await this.fireDatabaseService.updateFireItem(chatMessagesListCollection, this.message.fireId, this.message)
      this.closeEditMessage();
    }

    closeEditMessage() {
      this.textfieldForm.get('textarea')?.setValue('')
      this.editMessageWindow = false;
    }



}
