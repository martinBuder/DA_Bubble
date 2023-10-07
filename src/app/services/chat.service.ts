import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, query, where, getDocs, collectionGroup, onSnapshot} from '@angular/fire/firestore';
import { Observable, map } from 'rxjs';
import { ChannelConfig } from '../interfaces/channel-config';
import { UserDatasService } from './user-datas.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  chatOpen : boolean = false;
  channelListCollection = collection(this.firestore, 'channelList');
  // userChannels : any;
  channel !: ChannelConfig;
  userChannels : any = [ ];
  openAddChannel : boolean = false;
  

  constructor(private firestore: Firestore,
    private userDatasService: UserDatasService,) { 
    this.getChannelList()
  }

  /**
   * add new channels in firebase channelList
   */
  addChannel() {
    addDoc(this.channelListCollection, this.channel) 
  }

  /**
   * filter the right channels for user from firebase with abo 
   */
  async getChannelList() {
    await this.userDatasService.waitForNotNullValue();
      onSnapshot(query(this.channelListCollection, where('userIDs', 'array-contains', this.userDatasService.loggedInUser.id)),
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
  createChannel(channelHeader : string, channelDescription : string) {
    console.log('here');
    
    this.channel = {
      userIDs: [this.userDatasService.loggedInUser.id],
      userImages: [this.userDatasService.loggedInUser.img],
      channelName: channelHeader,
      description: channelDescription,
      admins: [this.userDatasService.loggedInUser.name],
      creator: this.userDatasService.loggedInUser.name, 
      usersAmount: 1,
    }

    this.addChannel()
    this.openAddChannel = false;
    
  }

}
