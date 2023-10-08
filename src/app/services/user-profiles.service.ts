import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { UserProfile } from '../interfaces/user-profile';

@Injectable({
  providedIn: 'root'
})
export class UserProfilesService {

  userProfileListCollection = collection(this.firestore, 'usersProfileList');
  // allAppUsers !: Array<UserProfil>;
  userProfile !: UserProfile;

  constructor(private firestore: Firestore,) { }

    /**
     * add the userProfile to firebase user collection
     */
    addProfile() {
      addDoc(this.userProfileListCollection, this.userProfile) 
    }
}
