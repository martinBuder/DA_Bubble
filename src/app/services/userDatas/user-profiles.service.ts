import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, doc, onSnapshot, query, setDoc, updateDoc } from '@angular/fire/firestore';
import { UserProfile } from '../../interfaces/user-profile';
import { FireDatabaseService } from '../firebase/fire-database.service';
import { FireAuthService } from '../firebase/fire-auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserProfilesService {

  userProfileListCollection = collection(this.firestore, 'usersProfileList');
  allAppUsers : Array<any> = [];
  userProfile !: UserProfile;
  contactProfile !: UserProfile;
  openProfile : boolean = false;

  constructor(
    private firestore: Firestore,
    private fireDatabaseService: FireDatabaseService,
  ) {

    this.getProfilesList();
   }

   getProfilesList() {
    this.fireDatabaseService.getListFromFirebase(this.userProfileListCollection, this.allAppUsers);
    // ~log muss weg
    console.log(this.allAppUsers);
   }

    /**
     * add the userProfile to firebase user collection
     */
    async addProfile() {
      await this.fireDatabaseService.setItemToFirebase('usersProfileList', this.userProfile.id, this.userProfile); 
    }

    /**
     * check if profile exist on firebase and react on this situation
     * 
     * @param user = profile to check
     */
    async handleProfileData(user:any) {
      const profileExist = this.findProfile(user);
      const online = true
      this.setUserProfile(user, online);
      if (profileExist) {
       await this.fireDatabaseService.updateFireItem(this.userProfileListCollection, this.userProfile.id, this.userProfile);
      }
      else
       this.addProfile();
    }

    /**
     * change th onlineStatus by checkOut
     * 
     * @param id from profile 
     */
    async updateOnlinestatusToProfile(id: any){
      await this.fireDatabaseService.updateFireItem(this.userProfileListCollection, id, this.userProfile);
    }

   

    /**
     * search for profil in all profiles
     * 
     * @param user = profile to find
     * @returns object or undefine
     */
    findProfile(user: any) {
      return this.allAppUsers.find(profile => profile.id == user.uid);
    }


    /**
     * set the profile informations
     * 
     * @param user 
     * @param online 
     */
    setUserProfile(user: any, online: boolean) {
      this.userProfile = {
        userName: user.displayName,
        userImg: user.photoURL,
        id: user.uid,
        userOnline: online,
        userMail: user.email,
      }  
    }

   
}
