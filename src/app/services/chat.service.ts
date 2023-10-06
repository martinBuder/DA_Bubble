import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, query, where, getDocs, collectionGroup, onSnapshot} from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';
import { ChannelConfig } from '../interfaces/channel-config';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  chatOpen : boolean = false;
  channelListCollection = collection(this.firestore, 'channelList');
  // userChannels : any;
  channel !: ChannelConfig;
  userChannels : any = [];
  fireUserChannels !: any ;

  constructor(private firestore: Firestore) { 
    this.getChannelList()
    
   }

  
  addChannel() {
    this.createChannel();
    addDoc(this.channelListCollection, this.channel) 
  }

  async getChannelList() {
    this.fireUserChannels = onSnapshot(query(this.channelListCollection, where('userIDs', 'array-contains', 'abc')),
     (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const channelData = doc.data();
        channelData['id'] = doc.id
        this.userChannels.push(channelData);
        console.log(this.userChannels); //! hier wird der channel ausgeloggt
      }); 
    });
  }


  createChannel() {
    this.channel = {
      userIDs: ['abc', 'afg', 'usb', 'etc'],
      userImages: ['assets/img/avatars/person-1.png', 'assets/img/avatars/person-2.png', 'assets/img/avatars/person-3.png'],
      channelName: 'test channel',
      description: 'a channel to test',
      usersAmount: 5,
      admins: '',
      creator: 'mb', 
    }

    
  }

}
