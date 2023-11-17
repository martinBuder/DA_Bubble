import { Injectable } from '@angular/core';
import { ChatConfig } from '../../interfaces/chat-config';
import { Firestore, collection, where } from '@angular/fire/firestore';
import { FireAuthService } from '../firebase/fire-auth.service';
import { FireDatabaseService } from '../firebase/fire-database.service';
import { ChatHeadDatasService } from './channel-head-datas.service';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  openChatData!: ChatConfig;
  contactId!: any;

  chatData: ChatConfig = {
    contactId: ['', ''],
  };

  contactsListCollection = collection(this.firestore, 'contactsList');

  constructor(
    private firestore: Firestore,
    private fireAuthService: FireAuthService,
    private fireDatabaseService: FireDatabaseService,
  ) {
    this.startContact();
  } 
   
  startContact() {
    this.getChannelList();
    this.fillContactDataInChannel();
  }

  /**
   * the way to add a contact
   */
  setContact(contactId: string) {
    this.setChatConfig(contactId);
    this.addContact();
  }

  /**
   * fill the contact with all datas 
   * 
   * @param contactUserId 
   */
  setChatConfig(contactUserId: string) {
    if (this.fireAuthService.fireUser !== null) {
      this.chatData = {
        contactId: [
          contactUserId,
          this.fireAuthService.fireUser.uid,
        ],
        id: this.createChatDatalId(contactUserId)
      };
    }    
  }

   /**
   * filter the right contacts for user from firebase with abo
   */
   async getChannelList() {
    await this.fireAuthService.waitForNotNullValue();
      this.fireDatabaseService.getQueryListFromFirebase(
      this.contactsListCollection,
      where('contactId', 'array-contains', this.fireAuthService.fireUser.uid),
      'contactChats'
    );
  }
  
  /**
   * take the id's from the new and make them to a new id, which is the same for both persons
   * 
   * @param contactUserId 
   * @returns 
   */
  createChatDatalId(contactUserId: any){
    let idsToConnect = [this.fireAuthService.fireUser.uid, contactUserId].sort();
    return idsToConnect.join('');   
  }

  /**
   * add a new contact with all informations
   */
  async addContact() {
    await this.fireDatabaseService.setItemToFirebase(
      'contactsList',
      this.chatData.id,
      this.chatData,
    );
    this.fillContactDataInChannel()
  }


  /**
   * search for the member informations in all appUsers
   *
   * @param channel
   * @returns
   */
  async fillContactDataInChannel() {
    await this.waitForNotNullValue();
    this.fireDatabaseService.contactChats.forEach((chat: any) => {
      const searchId = chat.contactId
        .filter((id: any) => id !== this.fireAuthService.fireUser.uid)
        .toString();
      chat.contact = this.fireDatabaseService.allAppUsers.find(
        (profile) => profile.id == searchId
      );
    });
  }

  /**
   * wait that contactChats is filled
   */
  async waitForNotNullValue() {
    while (this.fireDatabaseService.contactChats.length === 0) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
}
