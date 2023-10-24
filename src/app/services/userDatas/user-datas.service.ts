import { Injectable } from '@angular/core';
import { Auth, getAuth, signOut, updateProfile } from '@angular/fire/auth';
import { User } from '@firebase/auth';
import { Router } from '@angular/router';
import { UserProfilesService } from './user-profiles.service';
import { waitForAsync } from '@angular/core/testing';


@Injectable({
  providedIn: 'root'
})
export class UserDatasService {
  
  user: User | null = null;
  public loggedInUser: any | null = null; 
  
    constructor(
    private router: Router,
    public auth: Auth,
    private userProfilesService: UserProfilesService,
    ) {

    }

   

 

  /**
   * logOut for user in firebase 
   * !wahrscheinlich kann das weg
   */
  clearLoggedInUser() {
    this.loggedInUser = {
      name: '',
      img: '',
      email: '',
      id: '',
    }
  };

  /**
   * set the firebase user to my own user with just the datas I need
   * 
   * @param user firebase user
   */
  setLoggedInUser(user: any) {
    console.log(user);
    
    this.loggedInUser = {
      name: user.displayName,
      img: user.photoURL,
      email: user.email,
      id: user.uid,
    }
  }

// *just for see the old way 
//    // Profile-Daten aktualisieren
//    await this.userDatasService.updateFireUser(this.auth, 'displayName', this.profileName);
//    await this.userDatasService.updateFireUser(this.auth, 'photoURL', this.profileImg);
//    this.successfulMessage = 'Account erfolgreich erstellt.';
//    setTimeout(() => {
//      this.successfulMessage = null;
//    }, 2000);
//  } catch (error: any) {
//    const errorCode = error.code;
//    if (errorCode === 'this.auth/email-already-in-use') {
//      this.errorMessage = 'Dieser Benutzer hat bereits ein Konto.';
//    } else {
//      this.errorMessage = 'Da ist leider was schief gelaufen.';
//    }
//    await this.userDatasService.logOut();
//    setTimeout(() => {
//      this.errorMessage = null;
//    }, 2000);

//  }
// }

//  /**
// * check is there a active firebase user and something is changed on it
// * yes = make this user to loggeInUser
// * no = do nothing for checkout
// */
//  async checkFirebaseUser() {
//    this.auth = getAuth();
//    this.auth.onAuthStateChanged((firebaseUser) => {
//      this.user = firebaseUser;
//        if (firebaseUser) {
//        this.setLoggedInUser(this.user);
       
//      }
//    });
//  }


//   /**
// * user will be sign out and the browser navigate to checkIn site
// */
// async logOut() {
//  try {
//    const online = false;
//    this.userProfilesService.setUserProfile(this.user, online);  
//    if(this.user) {
//      await this.userProfilesService.updateProfile(this.user.uid); 
//    }
//    this.clearLoggedInUser();  
//    await signOut(this.auth);
//  } catch (error) {
//    console.error("Fehler beim Ausloggen:", error);
//  }
//  this.router.navigate(['/']);

 
// /**
// * change the firebase user datas
// * 
// * @param auth 
// * @param key firebase userJson key to change
// * @param value firebase userJson value to this key
// */
// async updateFireUser(auth:Auth, key: any, value : string) {
//  if (auth.currentUser) {
//    await updateProfile(auth.currentUser, {
//    [key] : value
//    }).then(() => {
//    // Profile updated!
//    }).catch((error) => {
//    // An error occurred
//    // ...
//    });
//  }
// }
// };

}

