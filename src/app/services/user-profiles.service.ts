import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, onSnapshot, query, setDoc, updateDoc } from '@angular/fire/firestore';
import { UserProfile } from '../interfaces/user-profile';

@Injectable({
  providedIn: 'root'
})
export class UserProfilesService {

  userProfileListCollection = collection(this.firestore, 'usersProfileList');
  allAppUsers : Array<any> = [];
  userProfile !: UserProfile;
  contactProfile !: UserProfile;
  openProfile : boolean = false;

  constructor(private firestore: Firestore,) {

    this.getProfilesList()
   }

   /**
    * get a list from firebase with all users from this app
    */
   getProfilesList() {
      onSnapshot(query(this.userProfileListCollection),
      (querySnapshot) => {
        this.allAppUsers = [];
        querySnapshot.forEach((doc) => {
          const profileData = doc.data();
          profileData['id'] = doc.id;
          this.allAppUsers.push(profileData);
        }); 
        // this.allAppUsers.sort((a.names:any, b:any) => a - b); // sort the array by time backwards       
      });
    }


    /**
     * add the userProfile to firebase user collection
     */
    async addProfile() {
      await setDoc(doc(this.firestore, 'usersProfileList', this.userProfile.id), this.userProfile)
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
       await this.updateProfile(this.userProfile.id);
      }
      else
       this.addProfile();
    }

    /**
     * update the profile in firebase
     * 
     * @param id profile-id
     */
    async updateProfile(id: string) {
      const profileRef = doc(this.userProfileListCollection, id)
      await updateDoc(profileRef, this.userProfile);
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
