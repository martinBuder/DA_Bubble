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
  userChannels !: any;

  constructor(private firestore: Firestore) { 
    this.getChannelList()
    
   }


  addChannel() {
    this.createChannel();
    addDoc(this.channelListCollection, this.channel) 
  }

  async getChannelList() {
    this.userChannels = onSnapshot(query(this.channelListCollection, where('userIDs', 'array-contains', 'abc')),
     (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });
    });
  }

    // query(this.channelListCollection, where('userIDs', 'array-contains', 'abc'));
    
   
   
   
   
    // this.projectList$ = collectionData(this.fireQuery, {idField : 'id'});

   

    // this.userChannels = await getDocs(fireQuery);
    // this.userChannels.forEach((doc : any) => {
    //     // doc.data() is never undefined for query doc snapshots
    //     console.log(this.userChannels);
        
    //     console.log(doc.id, " => ", doc.data());
        
    //     // this.userChannels.push(doc.data());
    //   });

    //   console.log(this.userChannels);

    // this.channelsList$ = this.fireQuery('channelList', fireQuery)
    // .valueChanges()
    //   .pipe(
    //     map((channels: ChannelConfig[]) => {
    //       // Hier kannst du weitere Verarbeitungen durchführen, falls benötigt
    //       return channels;
    //     })
    //   );
      
    
    
    


  // * für später
      // import { query, collection, where } from 'firebase/firestore';

    // const q = query(collection(db, 'IhreSammlungsID'), where('Feld', '==', 'Wert'));

  createChannel() {

    this.channel = {
      userIDs: ['abc', 'afg'],
      userImages: ['assets/img/avatars/person-1.png', 'assets/img/avatars/person-2.png', 'assets/img/avatars/person-3.png'],
      channelName: 'test channel',
      description: 'a channel to test',
      usersAmount: 2,
      admins: '',
      creator: 'mb', 
    }

    
  }

}
