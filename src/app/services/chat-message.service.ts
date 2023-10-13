import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, onSnapshot, query, where } from '@angular/fire/firestore';
import { Message } from '../interfaces/message';
import { UserDatasService } from './user-datas.service';
import { Observable } from 'rxjs';

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
  channelMessagesList$ !: Observable<any>;
  channelMessages !: any;

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
    await addDoc(this.chatMessagesListCollection, this.messageDatas ) 
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
   * get the messeages from this channel
   */
  getChannelMessagesList() {
    const channelMessagesListCollection = collection(this.firestore, this.messageChannelId);
    onSnapshot(query(channelMessagesListCollection),
    (querySnapshot) => {
      this.channelMessages = [];
      querySnapshot.forEach((doc) => {
        const messageData = doc.data();
        messageData['id'] = doc.id;
        this.channelMessages.push(messageData);
      }); 
      this.channelMessages.sort((a:any, b:any) => b.timestamp - a.timestamp); // sort the array by time backwards
      console.log(this.channelMessages);
      
    });
  }

  checkMessageDate() {

  }



}


