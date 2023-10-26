import { Injectable } from '@angular/core';
import { ChatConfig } from '../../interfaces/chat-config';
import { Firestore, addDoc, collection, onSnapshot, query, where } from '@angular/fire/firestore';

import { UserProfilesService } from '../userDatas/user-profiles.service';
import { FireAuthService } from '../firebase/fire-auth.service';
import { FireDatabaseService } from '../firebase/fire-database.service';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  openChatData !: ChatConfig;

  chatData : ChatConfig = {
    contactId: ['', ''],
  };

  contactChats : Array<any> = [];
  contactsListCollection = collection(this.firestore, 'contactsList');

  constructor(
    private firestore: Firestore,
    private fireAuthService: FireAuthService,
    private fireDatabaseService:FireDatabaseService,
    private userProfilesService: UserProfilesService,
  ) { 
    this.getChannelList();
    this.fillContactDataInChannel();
  }

  setContact() {
      this.setChatConfig();
      this.addContact();    
  }

  setChatConfig() {
    if(this.fireAuthService.fireUser !== null) {
      this.chatData = {
        contactId: ['2WWmAZfqH7gCxt6Lr9cyv1GlRQ33', this.fireAuthService.fireUser.uid],
      }
    }
  }

  addContact() {
    this.fireDatabaseService.addItemToFirebase(this.contactsListCollection, this.chatData);
  }

  /**
   * filter the right contacts for user from firebase with abo 
   */
  async getChannelList() {
    await this.fireAuthService.waitForNotNullValue();
    this.fireDatabaseService.getQueryListFromFirebase(
      this.contactsListCollection,
      where('contactId', 'array-contains', this.fireAuthService.fireUser.uid),
      this.contactChats,
    )
  }

    /**
   * search for the member informations in all appUsers 
   * 
   * @param channel 
   * @returns 
   */
    async fillContactDataInChannel(){
      await this.waitForNotNullValue();
      this.contactChats.forEach((chat: any) => {
        const searchId = chat.contactId.filter((id: any) => id !== this.fireAuthService.fireUser.uid).toString()
        chat.contact = this.userProfilesService.allAppUsers.find(profile => profile.id == searchId);
      })
    }

  /**
   * wait that contactChats is filled
   */
  async waitForNotNullValue() {
    while (this.contactChats.length === 0) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

}

