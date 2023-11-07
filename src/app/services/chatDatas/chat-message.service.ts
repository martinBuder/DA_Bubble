import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  onSnapshot,
  query,
} from '@angular/fire/firestore';
import { Message } from '../../interfaces/message';
import { FireDatabaseService } from '../firebase/fire-database.service';
import { FireAuthService } from '../firebase/fire-auth.service';
import { UserProfile } from 'src/app/interfaces/user-profile';
import { ContactsService } from './contacts.service';

@Injectable({
  providedIn: 'root',
})
export default class ChatMessageService {
  timestamp!: any;
  date!: Date;
  time!: any;
  year!: any;
  messageText!: string;
  messageDatas!: Message;
  messageChannelId: string = 'empty';
  chatMessagesListCollection!: any;
  channelMessages: any | null = null;
  chatToContact !: any; 
  selectedContact !: UserProfile;
  messageIsSent: boolean = true;

  constructor(
    private firestore: Firestore,
    private fireAuthService: FireAuthService,
    private fireDatabaseService: FireDatabaseService,
    private contactsService: ContactsService,
  ) {
    this.getTime();
  }

  setMessageDatas() {
    this.messageDatas = {
      timestamp: this.timestamp,
      date: this.date,
      time: this.time,
      year: this.year,
      writerName: this.fireAuthService.fireUser.displayName,
      writerImg: this.fireAuthService.fireUser.photoURL,
      writerId: this.fireAuthService.fireUser.uid,
      reactions: `test`,
      text: this.messageText,
    };
  }

  /**
   * add messeage to firebase
   */
  async addFireMessage() {
    this.getTime();
    this.setMessageDatas();
    this.chatMessagesListCollection = collection(
      this.firestore,
      this.messageChannelId
    );
    await this.fireDatabaseService.addItemToFirebase(
      this.chatMessagesListCollection,
      this.messageDatas
    );
    if(this.selectedContact)
     this.contactsService.setContact(this.selectedContact.id);
     this.messageIsSent = true;
  }

  /**
   *  get the time in all variants i need for message 
   */
  getTime() {
    const dateOptions = { weekday: 'long', day: 'numeric', month: 'long' };
    this.timestamp = new Date();
    this.date = this.timestamp.toLocaleDateString('de-DE', dateOptions);
    this.year = this.timestamp.toLocaleDateString('de-DE', { year: 'numeric' });
    this.time = {
      hour: this.timestamp.getHours().toString().padStart(2, '0'),
      minute: this.timestamp.getMinutes().toString().padStart(2, '0'),
    };
    this.time = this.time.hour + ':' + this.time.minute;
  }

  /**
   * get the messages from this channel
   */
  async getChannelMessagesList() {
    const channelMessagesListCollection = collection(
      this.firestore,
      this.messageChannelId
    );   
    onSnapshot(query(channelMessagesListCollection), (querySnapshot) => {
      this.channelMessages = [];
      querySnapshot.forEach((doc) => {
        const messageData = doc.data();       
        this.channelMessages.push(messageData);
      });
      this.channelMessages.sort((a: any, b: any) => b.timestamp - a.timestamp); // sort the array by time backwards
    });
  }

  findChatForMessage() {
    this.createMessageChannelId();
  }


  /**
   * take the two contactNumbers sort them and make it to the messageChannelId
   * we sort it so that is always the same number for contact and for the fireUser
   */
  async createMessageChannelId(){
    let idsToConnect = [this.fireAuthService.fireUser.uid, this.selectedContact.id].sort();
    this.messageChannelId = idsToConnect.join('');    
  }

  /**
   * fill the selectContact with the contactProfile
   * 
   * @param profile 
   */
  selectContact(profile: UserProfile) {
    this.selectedContact = profile;
  }

  /**
   * wait that userChannels is filled
   */
  async waitForMessageIsSent() {
    while (this.messageIsSent === false) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
 
}
