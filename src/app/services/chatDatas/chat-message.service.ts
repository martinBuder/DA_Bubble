import { Injectable } from '@angular/core';
import { Firestore, collection} from '@angular/fire/firestore';
import { Message } from '../../interfaces/message';
import { UserDatasService } from '../userDatas/user-datas.service';
import { FireDatabaseService } from '../firebase/fire-database.service';

@Injectable({
  providedIn: 'root'
})
export default class ChatMessageService {

  timestamp !: any;
  date !: Date;
  time !: any;
  year !: any;
  messageText !: string
  messageDatas !: Message;
  messageChannelId : string = 'empty';
  chatMessagesListCollection !: any;
  channelMessages !: any;

  constructor(
    private firestore: Firestore,
    private fireDatabaseService: FireDatabaseService,
    private userDatasService: UserDatasService,
  ) {
    this.getTime()
  }


  setMessageDatas() {
    this.messageDatas = {
      timestamp: this.timestamp,
      date: this.date,
      time: this.time,
      year: this.year,
      writerName: this.userDatasService.loggedInUser.name,
      writerImg: this.userDatasService.loggedInUser.img,
      writerId: this.userDatasService.loggedInUser.id,
      reactions: `test`,
      text: this.messageText,
    }
  }

  /**
   * add messeage to firebase 
   */
  async addFireMessage() {
    this.getTime();
    this.setMessageDatas();
    this.chatMessagesListCollection = collection(this.firestore, this.messageChannelId);
    await this.fireDatabaseService.addItemToFirebase(this.chatMessagesListCollection, this.messageDatas) 
  }

  /** get the time in all variants i need for message */
  getTime() {
    const dateOptions = { weekday: 'long', day: 'numeric', month: 'long'};
    this.timestamp = new Date();
    this.date = this.timestamp.toLocaleDateString('de-DE', dateOptions);
    this.year = this.timestamp.toLocaleDateString('de-DE', {year: 'numeric'})
    this.time = {
      hour: this.timestamp.getHours().toString().padStart(2, '0'),
      minute: this.timestamp.getMinutes().toString().padStart(2, '0'),
    }
    this.time = this.time.hour + ':' + this.time.minute
  };

  /**
   * get the messages from this channel
   */
   getChannelMessagesList() {
    const channelMessagesListCollection = collection(this.firestore, this.messageChannelId);
    this.fireDatabaseService.getListFromFirebase(channelMessagesListCollection, this.channelMessages);
    this.channelMessages.sort((a:any, b:any) => b.timestamp - a.timestamp); // sort the array by time backwards
  }

  checkMessageDate() {

  }



}


