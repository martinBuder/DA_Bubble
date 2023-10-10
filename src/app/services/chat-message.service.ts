import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Message } from '../interfaces/message';
import { UserDatasService } from './user-datas.service';
import { Time } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export default class ChatMessageService {

  timestamp !: any;
  date !: Date;
  time !: any;
  year !: any;
  messageDatas !: Message;
  messageChannelId : string = 'empty';
  chatMessagesListCollection !: any;

  constructor(
    private firestore: Firestore,
    private userDatasService: UserDatasService
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
      reactions: `test`,
      text: 'ja so ist das',
    }
  }

  /**
   * add messeage to firebase 
   */
  async addFireMessage() {
    this.getTime();
    this.setMessageDatas();
    this.chatMessagesListCollection = collection(this.firestore, this.messageChannelId);
    await addDoc(this.chatMessagesListCollection, this.messageDatas ) 
  }

  /** get the time in all variants i need for message */
  getTime() {
    const dateOptions = { weekday: 'long', day: 'numeric', month: 'long'};
    this.timestamp = new Date();
    this.date = this.timestamp.toLocaleDateString('de-DE', dateOptions);
    this.year = this.timestamp.toLocaleDateString('de-DE', {year: 'numeric'})
    this.time = {
      hour: this.timestamp.getHours(),
      minute: this.timestamp.getMinutes(),
    }
    this.time = this.time.hour + ':' + this.time.minute
  };


}


