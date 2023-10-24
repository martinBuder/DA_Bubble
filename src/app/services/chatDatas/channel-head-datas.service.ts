import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { Firestore, collection, addDoc, query, where, onSnapshot, doc, updateDoc} from '@angular/fire/firestore';
import { ChannelConfig } from '../../interfaces/channel-config';
import { UserDatasService } from '../userDatas/user-datas.service';
import { UserProfilesService } from '../userDatas/user-profiles.service';
import { FireDatabaseService } from '../firebase/fire-database.service';
import { FireAuthService } from '../firebase/fire-auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChatHeadDatasService {

  chatOpen : boolean = false;
  channelListCollection = collection(this.firestore, 'channelList');
  // userChannels : any;
  channel !: ChannelConfig;
  userChannels : any = [ ];
  fireChannelMembers : Array<any> =  []
  openAddChannel : boolean = false;
  

  constructor(
    private firestore: Firestore,
    private fireAuthService: FireAuthService,
    private fireDatabaseService: FireDatabaseService,
    private userDatasService: UserDatasService,
    private userProfilesService: UserProfilesService) { 
    this.getChannelList()
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
    await this.userDatasService.waitForNotNullValue();
    console.log(this.fireAuthService.fireUser)
    this.fireDatabaseService.getListFromFirebase(
      
      
      (this.channelListCollection, where('membersId', 'array-contains', this.fireAuthService.fireUser.uid)), this.userChannels);

    
     
  }

  /**
   * search for the member informations in all appUsers 
   * 
   * @param channel 
   * @returns 
   */
  fillMembersDataInChannel(channel : any){
        return this.userProfilesService.allAppUsers.filter(profile => channel.membersId.includes(profile.id));
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
      admins: [this.userDatasService.loggedInUser.name],
      creator: this.userDatasService.loggedInUser.name, 
      usersAmount: 1,
      members: [this.userDatasService.loggedInUser.id],
      membersId: [this.userDatasService.loggedInUser.id],
    }
  }

  /**
   * push the members.id to the channels
   * concat is to include just the content, not the full array
   * 
   * @param newProfiles 
   */
  changeChannelMembers(newProfiles: Array<string>) {
    this.channel.members.forEach(member => {
     this.fireChannelMembers.push(member.id);  
    });
    this.fireChannelMembers = this.fireChannelMembers.concat(newProfiles);
    this.channel.membersId = this.fireChannelMembers;
    console.log(this.channel.membersId);
    
  }

  /**
   * update the chanelConfig in firebase
   */
  async updateChannel() {
    let membersAmount
    if(this.channel.membersId)
    membersAmount = this.channel.membersId.length
    
    if (this.channel.id) { // Überprüfen, ob channelId vorhanden ist
        const channelId = this.channel.id;
        const channelRef = doc(this.channelListCollection, channelId);
        await updateDoc(channelRef, {
            membersId: this.channel.membersId,
            usersAmount: membersAmount 
        });
    } else {
        console.error('Ungültiger channelId in this.channel');
    }
}

  /**
   * search for the index from the updated channel
   * 
   * @param channelId 
   * @returns 
   */
  findUpdatedChannel(channelId: string) {
    return this.userChannels.findIndex((channel: { id: string; }) => channel.id === channelId);
  }
  
  

}

