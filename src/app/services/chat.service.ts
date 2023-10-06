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
  openAddChannel : boolean = false;
  

  constructor(private firestore: Firestore) { 
    this.getChannelList()
  }

  /**
   * add new channels in firebase channelList
   */
  addChannel() {
    this.createChannel(); //! this is just to test things
    addDoc(this.channelListCollection, this.channel) 
  }

  /**
   * filter the right channels for user from firebase with abo 
   */
  async getChannelList() {
    onSnapshot(query(this.channelListCollection, where('userIDs', 'array-contains', 'abc')),
     (querySnapshot) => {
      this.userChannels = [];
      querySnapshot.forEach((doc) => {
        const channelData = doc.data();
        channelData['id'] = doc.id
        this.userChannels.push(channelData);
      }); 
      console.log(this.userChannels);
      
    });
  }

  

  /**
   * create a channel to add this on firestore
   */
  createChannel() {
    console.log('here');
    
    this.channel = {
      userIDs: ['abc', 'etc'],
      userImages: ['assets/img/avatars/person-1.png', 'assets/img/avatars/person-2.png', 'assets/img/avatars/person-3.png'],
      channelName: 'test channel 5',
      description: 'a channel to test',
      usersAmount: 5,
      admins: [],
      creator: 'mb', 
    }

    
  }

}
