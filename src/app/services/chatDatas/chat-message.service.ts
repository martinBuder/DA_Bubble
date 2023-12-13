import { Injectable } from '@angular/core';
import { Firestore, collection } from '@angular/fire/firestore';
import { Message } from '../../interfaces/message';
import { FireDatabaseService } from '../firebase/fire-database.service';
import { FireAuthService } from '../firebase/fire-auth.service';
import { UserProfile } from 'src/app/interfaces/user-profile';
import { ContactsService } from './contacts.service';
import { OpenCloseService } from '../generally/open-close.service';
import { ChatHeadDatasService } from './channel-head-datas.service';

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
  isThisAnImage : boolean = false;

  messageDatas!: Message;
  threadFirstMessage !: Message;
  messageCopy!: Message;

  messageChannelId: string | null = null;
  messageThreadId!: string;
  chatMessagesListCollection!: any;
  chatToContact!: any;
  selectedContact : UserProfile | null = null;
  messageIsSent: boolean = true;
  contactMail: string | null = null;
  contactMistake: boolean = true;
  mailAddressMistake: boolean = false;
  today !: any;
  comeFromAnswer : boolean = false;
  firstThreadMessageSent : boolean = false;
  noSelectedContact : boolean = false;


  constructor(
    private firestore: Firestore,
    private fireAuthService: FireAuthService,
    private fireDatabaseService: FireDatabaseService,
    private chatHeadDataService: ChatHeadDatasService,
    private contactsService: ContactsService,
    private openCloseService: OpenCloseService,
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
      numDate: this.dateNumber,
      time: this.time,
      year: this.year,
      writerName: this.fireAuthService.fireUser.displayName,
      writerImg: this.fireAuthService.fireUser.photoURL,
      writerId: this.fireAuthService.fireUser.uid,
      text: this.messageText,
      reactions: [],
      threadExist: false,
      deletedMessage: false,
      lastEditedTime: null,
      isThisAnImage : this.isThisAnImage
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

  clearOldChatDatas() {
    this.contactMail = null;
    this.selectedContact = null;
    this.messageChannelId = null;
    this.fireDatabaseService.channelMessages = [];
    this.chatHeadDataService.channel = null;
  }

  /**
   * add messeage to firebase
   */
  async sendMessage(chatOrThread : string) {     
    if (this.contactMail === null &&
        this.selectedContact === null &&
        this.messageChannelId === null) {    
         this.noSelectedContact = true;
        } else {
          if (this.contactMail !== null) this.sendEmail();
          else this.sendAppMessage(chatOrThread);
        }
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
    if(this.messageChannelId !== null) {
      const chatMessagesListCollection = collection(
        this.firestore,
        this.messageChannelId
      );    
      this.fireDatabaseService.getListFromFirebase(chatMessagesListCollection, 'channelMessages'); 
    }
  }

   /**
   * get the messages from this channel
   */
   async getThreadMessagesList() {   
    const threadMessagesListCollection = collection(
      this.firestore,
      this.messageThreadId
    );   
    this.fireDatabaseService.getListFromFirebase(threadMessagesListCollection, 'threadMessages'); 
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
    if(this.selectedContact !== null) {
      let idsToConnect = [
        this.fireAuthService.fireUser.uid,
        this.selectedContact.id,
      ].sort();
      this.messageChannelId = idsToConnect.join('');
    }    
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
  async sendAppMessage(chatOrThread : string) {   
    if(chatOrThread === 'chat')      
    this.setFireChatCollection();
    if(chatOrThread === 'thread')
    this.setFireThreadCollection();
    if (this.selectedContact)
      this.contactsService.setContact(this.selectedContact.id);
      this.getTime();
      this.setMessageDatas();   
      await this.fireDatabaseService.addItemToFirebase(
        this.chatMessagesListCollection,
        this.messageDatas
      );  
    if(!this.threadFirstMessage.threadExist && this.comeFromAnswer)
      await this.firstThreadOpen();
    else
      this.changeChannelMessage();  
    this.messageIsSent = true;
    this.comeFromAnswer = false;
  }

  /**
   * add the first message, which opened the thread to firebase
   */
  async firstThreadOpen() {
    await this.changeChannelMessage();
    this.threadFirstMessage.reactions = [];
    await this.fireDatabaseService.addItemToFirebase(
      this.chatMessagesListCollection,
      this.threadFirstMessage
    );
     this.setFirstThreadMessageSent();
  }

  /**
   * change the firstThreadMessageSent variable
   */
  setFirstThreadMessageSent() {
    this.firstThreadMessageSent = true;
    setTimeout(() => {
      this.firstThreadMessageSent = false;
    }, 1000);
  }

  /**
   * send the variable threadExist in the channel message 
   */
  async changeChannelMessage(){
    this.setMessageCopy();
    if(this.openCloseService.threadChannel) {
      const chatMessagesListCollection = collection(
        this.firestore,
        this.openCloseService.threadChannel.id
      );    
      await this.fireDatabaseService.updateFireItem(chatMessagesListCollection, this.threadFirstMessage.id, this.messageCopy)
    }
  }

  /**
   * set the datas from the message from channel, which was open for the thread
   */
  setMessageCopy() {
    this.messageCopy.threadExist = true;
    if(!this.messageCopy.answerAmount)
      this.messageCopy.answerAmount = 0;
    this.messageCopy.answerAmount += 1;
    this.messageCopy.lastAnswerDate = this.messageDatas.numDate;
    this.messageCopy.lastAnswerTime = this.messageDatas.time;
    console.log(this.messageCopy.answerAmount);
    
  }

  /**
   * set the fire collection with the thread Datas
   */
  setFireThreadCollection() {   
    this.chatMessagesListCollection = collection(
      this.firestore,
      this.messageThreadId
    );
  }

  /**
   * set the fire collection with the chat Datas
   */
  setFireChatCollection() {
    if(this.messageChannelId !== null) {
    this.chatMessagesListCollection = collection(
      this.firestore,
      this.messageChannelId
    );
    }
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
