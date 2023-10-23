import { Injectable } from '@angular/core';
import { ChatConfig } from '../interfaces/chat-config';
import { Firestore, addDoc, collection, onSnapshot, query, where } from '@angular/fire/firestore';
import { UserDatasService } from './user-datas.service';
import { UserProfilesService } from './user-profiles.service';

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
    private userDatasService: UserDatasService,
    private userProfilesService: UserProfilesService
  ) { 
    this.getChannelList()
  }

  setContact() {
      this.setChatConfig();
      this.addContact();    
  }

  setChatConfig() {
    if(this.userDatasService.loggedInUser.id !== null) {
      this.chatData = {
        contactId: ['2WWmAZfqH7gCxt6Lr9cyv1GlRQ33', this.userDatasService.loggedInUser.id],
      }
    }
  }

  addContact() {
    addDoc(this.contactsListCollection, this.chatData) 
  }

  /**
   * filter the right contacts for user from firebase with abo 
   */
  async getChannelList() {
    await this.userDatasService.waitForNotNullValue();
      onSnapshot(query(this.contactsListCollection, where('contactId', 'array-contains', this.userDatasService.loggedInUser.id)),
      (querySnapshot) => {
        this.contactChats = [];
        querySnapshot.forEach((doc) => {
          const chat = doc.data();
          chat['id'] = doc.id
          chat['contact'] = this.fillContactDataInChannel(chat); 
          console.log(chat['contact']);
           
          this.contactChats.push(chat);
          console.log(this.contactChats);
        }); 
      });
  }

    /**
   * search for the member informations in all appUsers 
   * 
   * @param channel 
   * @returns 
   */
    fillContactDataInChannel(chat : any){
     const userContactId = chat.contactId.filter((id: any) => id !== this.userDatasService.loggedInUser.id).toString();  
     return this.userProfilesService.allAppUsers.find(profile => profile.id == userContactId);
    }

}

