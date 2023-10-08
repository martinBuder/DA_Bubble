import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { Firestore, collection, addDoc, query, where, onSnapshot} from '@angular/fire/firestore';
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
   * add the collection to firebas
   * 
   * @param fireCollection 
   * @param collectionItem the item we want to push to firebase
   */
  addChannel(fireCollection : any, collectionItem : any) {
    addDoc(fireCollection, collectionItem) 
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
    this.setChannelConfig(channelHeader, channelDescription)
    this.addChannel(this.channelListCollection, this.channel)
    this.openAddChannel = false;
  }

  
  /**
   * set the channel with all config informations
   * 
   * @param channelHeader 
   * @param channelDescription 
   */
  setChannelConfig(channelHeader : string, channelDescription : string) {
    this.channel = {
      userIDs: [this.userDatasService.loggedInUser.id],
      // userImages: [this.userDatasService.loggedInUser.img],
      // userNames: [this.userDatasService.loggedInUser.name],
      channelName: channelHeader,
      description: channelDescription,
      admins: [this.userDatasService.loggedInUser.name],
      creator: this.userDatasService.loggedInUser.name, 
      usersAmount: 1,
      members: [{userIDs: this.userDatasService.loggedInUser.id,	userImages: this.userDatasService.loggedInUser.img,	userNames: this.userDatasService.loggedInUser.name}]
    }
  }

}

