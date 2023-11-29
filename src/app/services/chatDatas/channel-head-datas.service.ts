import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { Firestore, collection, where} from '@angular/fire/firestore';
import { ChannelConfig } from '../../interfaces/channel-config';
import { FireDatabaseService } from '../firebase/fire-database.service';
import { FireAuthService } from '../firebase/fire-auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChatHeadDatasService {

  chatOpen : boolean = false;
  channelListCollection = collection(this.firestore, 'channelList');
  channel !: ChannelConfig | null;
  
  fireChannelMembers : Array<any> =  [];
  openAddChannel : boolean = false;

 
  constructor(
    private firestore: Firestore,
    private fireAuthService: FireAuthService,
    private fireDatabaseService: FireDatabaseService,
  ) { 
  }


  /**
   * add the collection to firebas
   * 
   * @param fireCollection 
   * @param collectionItem the item we want to push to firebase
   */
  addChannel(fireCollection : any, collectionItem : any) {
    this.fireDatabaseService.addItemToFirebase(fireCollection, collectionItem)
  }


  /**
   * filter the right channels for user from firebase with abo 
   */
  async getChannelList() {
    await this.fireAuthService.waitForNotNullValue();
    await this.fireDatabaseService.getQueryListFromFirebase(      
      this.channelListCollection,
      where('membersId', 'array-contains', this.fireAuthService.fireUser.uid),
      'userChannels');
  }


  /**
   * search for the member informations in all appUsers 
   * 
   * @param channel 
   * @returns 
   */
  async fillMembersDataInChannel(){
    await this.waitForNotNullValue();
    this.fireDatabaseService.userChannels.forEach((channel: any) => {
      channel['members'] = this.fireDatabaseService.allAppUsers.filter(profile => channel['membersId'].includes(profile.id))
    });         
  }

  /**
   * wait that userChannels is filled
   */
  async waitForNotNullValue() {
    while (this.fireDatabaseService.userChannels.length === 0) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
 

  /**
   * create a channel to add this on firestore
   */
  createChannel(channelHeader : string, channelDescription : string) {
    this.setChannelConfig(channelHeader, channelDescription);
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
      channelName: channelHeader,
      description: channelDescription,
      admins: [this.fireAuthService.fireUser.displayName],
      creator: this.fireAuthService.fireUser.displayName, 
      usersAmount: 1,
      members: [this.fireAuthService.fireUser.uid],
      membersId: [this.fireAuthService.fireUser.uid],
    }
  }

  /**
   * push the members.id to the channels
   * concat is to include just the content, not the full array
   * 
   * @param newProfiles 
   */
  changeChannelMembers(newProfiles: Array<string>) {
    if(this.channel !== null) {
      this.channel.members.forEach(member => {
        this.fireChannelMembers.push(member.id);  
       });
       this.fireChannelMembers = this.fireChannelMembers.concat(newProfiles);
       this.channel.membersId = this.fireChannelMembers;
    }
  }

  /**
   * update the chanelConfig in firebase
   */
  async updateChannel() {
    let membersAmount
    if(this.channel !== null) {
      if(this.channel.membersId)
      membersAmount = this.channel.membersId.length
      if (this.channel.id) { // Überprüfen, ob channelId vorhanden ist
        await this.fireDatabaseService.updateFireItem(this.channelListCollection, this.channel.id, {
            membersId: this.channel.membersId,
            usersAmount: membersAmount 
        });
      } 
    }
 
}

  /**
   * search for the index from the updated channel
   * 
   * @param channelId 
   * @returns 
   */
  findUpdatedChannel(channelId: string) {
    return this.fireDatabaseService.userChannels.findIndex((channel: { id: string; }) => channel.id === channelId);
  }
}

