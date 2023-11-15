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
  dateNumber! : Date;
  time!: any;
  year!: any;
  messageText!: string;
  messageDatas!: Message;
  messageChannelId: string = 'empty';
  chatMessagesListCollection!: any;
  channelMessages: any | null = null;
  chatToContact!: any;
  selectedContact!: UserProfile;
  messageIsSent: boolean = true;
  contactMail: string | null = null;
  contactMistake: boolean = true;
  mailAddressMistake: boolean = false;
  today !: any;

  constructor(
    private firestore: Firestore,
    private fireAuthService: FireAuthService,
    private fireDatabaseService: FireDatabaseService,
    private contactsService: ContactsService
  ) {
    this.getToday();
  }

  /**
   * set the message datas 
   */
  setMessageDatas() {
    this.messageDatas = {
      timestamp: this.timestamp,
      date: this.date,
      time: this.time,
      year: this.year,
      writerName: this.fireAuthService.fireUser.displayName,
      writerImg: this.fireAuthService.fireUser.photoURL,
      writerId: this.fireAuthService.fireUser.uid,
      text: this.messageText,
      reactions: []
    };
  }

  getToday() {
    this.getTime();
    this.today = {
      date: this.date,
      dateNumber: this.dateNumber,
      year: this.year
    }
  }

  /**
   * add messeage to firebase
   */
  sendMessage() { 
    if (this.contactMail !== null) this.sendEmail();
    else this.sendAppMessage();
  }

  /**
   *  get the time in all variants i need for message 
   */
  getTime() {
    const dateOptions = { weekday: 'long', day: 'numeric', month: 'long'};
    const dateNumberOptions = { day: 'numeric', month: 'numeric',};
    const yearOption = { year: 'numeric' };
    this.timestamp = new Date();
    this.date = this.timestamp.toLocaleDateString('de-DE', dateOptions);
    this.dateNumber = this.timestamp.toLocaleDateString('de-DE', dateNumberOptions);
    this.year = this.timestamp.toLocaleDateString('de-DE', yearOption);
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
        messageData['fireId'] = doc.id;
        this.channelMessages.push(messageData);
      });
      this.channelMessages.sort((a: any, b: any) => b.timestamp - a.timestamp); // sort the array by time backwards
    });
  }

  /**
   * find the channel id
   */
  findChatForMessage() {
    this.createMessageChannelId();
  }

  /**
   * take the two contactNumbers sort them and make it to the messageChannelId
   * we sort it so that is always the same number for contact and for the fireUser
   */
  async createMessageChannelId() {
    let idsToConnect = [
      this.fireAuthService.fireUser.uid,
      this.selectedContact.id,
    ].sort();
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

  /**
   * send the message in this app
   */
  async sendAppMessage() {
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
    if (this.selectedContact)
      this.contactsService.setContact(this.selectedContact.id);
    this.messageIsSent = true;
  }

  /**
   * send mail or show info
   */
  async sendEmail() {
    let formdata = new FormData;
    formdata.append('userMail', this.fireAuthService.fireUser.email);
    formdata.append('userName', this.fireAuthService.fireUser.displayName)
    formdata.append('message', this.messageText);
    if(this.contactMail !== null)
      formdata.append('contactMail', this.contactMail);
    

    if (this.isEmailValid()) 
    await fetch('https://designyourstage.com/sendMail/send_DABubble_mail.php',
    {
      method: 'POST',
      body: formdata,
    });
    else {
      this.mailAddressMistake = true;
      setTimeout(() => {
        this.mailAddressMistake = false;
      }, 2500);
    }
   this.contactMail = null; 
  }

  /**
   * check if email adress ist valid
   *
   * @returns boolean
   */
  isEmailValid() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (typeof this.contactMail === 'string')
      return emailRegex.test(this.contactMail);
    else return console.log(`error = contactMail isn't a string`);
  }
}
