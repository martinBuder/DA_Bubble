import { Component, Input, ViewChild } from '@angular/core';
import { Firestore, collection } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Message } from 'src/app/interfaces/message';
import { ChatHeadDatasService } from 'src/app/services/chatDatas/channel-head-datas.service';
import ChatMessageService from 'src/app/services/chatDatas/chat-message.service';
import { FireAuthService } from 'src/app/services/firebase/fire-auth.service';
import { FireDatabaseService } from 'src/app/services/firebase/fire-database.service';
import { EmojisService } from 'src/app/services/generally/emojis.service';
import { OpenCloseService } from 'src/app/services/generally/open-close.service';

@Component({
  selector: 'app-message-wrapper',
  templateUrl: './message-wrapper.component.html',
  styleUrls: ['./message-wrapper.component.scss'],
})
export class MessageWrapperComponent {
  @Input() message!: Message;
  @Input() chatOrThread!: string;

  allEmojis!: Array<any>;
  allEmojisOpen: boolean = false;
  editMessageWindow: boolean = false;
  textMessage!: string;

  /**
   * open or close the emojis window
   */
  toggleEmojis() {
    this.allEmojisOpen = !this.allEmojisOpen;
  }

  public textfieldForm: FormGroup = new FormGroup({
    textarea: new FormControl('', [Validators.required], []),
  });

  constructor(
    private firestore: Firestore,
    public fireAuthService: FireAuthService,
    private fireDatabaseService: FireDatabaseService,
    private openCloseService: OpenCloseService,
    public chatMessageService: ChatMessageService,
    private chatHeadDataService: ChatHeadDatasService,
    private emojisService: EmojisService
  ) {
    this.allEmojis = this.emojisService.getAllEmoijs();
  }

  /**
   * start - the way to add or remove a emoji to a message
   *
   * @param emoji
   */
  async addEmoji(emoji: any) {
    const chatMessagesListCollection = collection(
      this.firestore,
      this.chatMessageService.messageChannelId
    );
    await this.setEmojiDatas(emoji, this.message);
    this.fireDatabaseService.updateFireItem(
      chatMessagesListCollection,
      this.message.fireId,
      this.message
    );
  }

  /**
   * set the emoji datas to update
   *
   * @param emoji
   * @param message
   */
  async setEmojiDatas(emoji: any, message: any) {
    let emojiIndex = message.reactions.findIndex(
      (reaction: { item: any }) => reaction.item === emoji
    );
    if (emojiIndex === -1) {
      message.reactions.push(this.setFirstEmojiJson(emoji));
    } else {
      let reactionUserIndex = message.reactions[
        emojiIndex
      ].reactionUsers.findIndex(
        (user: { userId: any }) =>
          user.userId == this.fireAuthService.fireUser.uid
      );
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
  updateMessageEmojis(
    reactionUserIndex: number,
    message: Message,
    emojiIndex: number
  ) {
    if (reactionUserIndex === -1) {
      message.reactions[emojiIndex].amount++;
      message.reactions[emojiIndex].reactionUsers.push(this.setReactionUser());
    } else {
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
  spliceMessageEmoji(
    reactionUserIndex: number,
    message: Message,
    emojiIndex: number
  ) {
    if (message.reactions[emojiIndex].amount > 0) {
      message.reactions[emojiIndex].reactionUsers.splice(reactionUserIndex, 1);
    } else {
      message.reactions.splice(emojiIndex, 1);
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
      reactionUsers: [this.setReactionUser()],
    };
  }

  /**
   *
   * @returns reacted user (actually user) with the datas we need
   */
  setReactionUser() {
    return {
      name: this.fireAuthService.fireUser.displayName,
      userId: this.fireAuthService.fireUser.uid,
    };
  }

  // * open thread Message

  async answerToMessage() {
    this.chatMessageService.comeFromAnswer = true;
    this.openCloseService.threadChannel = {
      name: this.chatHeadDataService.channel.channelName,
      id: this.chatHeadDataService.channel.id,
    };
    this.openCloseService.threadOpen = true;
    this.chatMessageService.messageThreadId = this.message.fireId;
    let messageCopy = this.message;
    messageCopy.reactions = [];
    this.chatMessageService.threadFirstMessage = messageCopy;
    if (!this.message.threadExist) {
      this.fireDatabaseService.threadMessages = [];
      this.fireDatabaseService.threadMessages.push(messageCopy);
      await this.waitForThreadExist();
    }
    this.chatMessageService.getThreadMessagesList();
  }

  async waitForThreadExist() {
    while (!this.chatMessageService.firstThreadMessageSent === true) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  // *deletedMessage

  /**
   * delete Message
   */
  async deleteMessage() {
    this.setDeleteMessage();
    await this.sendUpdateDatasToFirebaseService();
  }

  /**
   * clear datas for delet message
   */
  setDeleteMessage() {
    this.message.writerName = '';
    this.message.writerImg = '';
    this.message.writerId = '';
    this.message.reactions = [];
    this.message.answerAmount = 0;
    this.message.lastAnswerTime = '';
    (this.message.text = 'Diese Nachricht wurde gelöscht.'),
      (this.message.lastEditedTime = {
        date: '',
        time: '',
        year: '',
      });
    this.message.deletedMessage = true;
  }

  // * edit messeage

  /**
   * open the edit messae window with the text from message
   *
   * @param message
   */
  editMessage(message: any) {
    this.textfieldForm.get('textarea')?.setValue(message.text);
    this.editMessageWindow = true;
  }

  /**
   * save the editet message
   *
   * @param input message text that is edited
   */
  async saveEditMessage(input: string) {
    if (this.message.text !== input) {
      this.message.text = input;
      this.setEditTimeToMessage();
      await this.sendUpdateDatasToFirebaseService();
      this.closeEditMessage();
    }
  }

  async sendUpdateDatasToFirebaseService() {
    const chatMessagesListCollection = collection(
      this.firestore,
      this.chatMessageService.messageChannelId
    );
    await this.fireDatabaseService.updateFireItem(
      chatMessagesListCollection,
      this.message.fireId,
      this.message
    );
  }

  /**
   * close message editer
   */
  closeEditMessage() {
    this.textfieldForm.get('textarea')?.setValue('');
    this.editMessageWindow = false;
  }

  /**
   * what time is the message editet
   */
  setEditTimeToMessage() {
    this.chatMessageService.getTime();
    this.message.lastEditedTime = {
      date: this.chatMessageService.dateNumber,
      time: this.chatMessageService.time,
      year: this.chatMessageService.year,
    };
  }
}
