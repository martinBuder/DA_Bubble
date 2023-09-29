import { Injectable } from '@angular/core';
import { Auth, getAuth, signOut, updateProfile } from '@angular/fire/auth';
import { User } from '@firebase/auth';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserDatasService {
  
  user: User | null = null;
  public loggedInUser: any = { }; 
  
    constructor(
    private router: Router,
    public auth: Auth,
    ) {
      this.checkFirebaseUser();
    }

  /**
   * check is there a active firebase user and something is changed on it
   * yes = make this user to loggeInUser
   * no = do nothing for checkout
   */
  async checkFirebaseUser() {
    const auth = getAuth();
    auth.onAuthStateChanged((firebaseUser) => {
      this.user = firebaseUser;
      if (firebaseUser) {
        this.setLoggedInUser(this.user)
      }
    });
  }

  /**
   * set the firebase user to my own user with just the datas I need
   * 
   * @param user firebase user
   */
  setLoggedInUser(user: any) {
    this.loggedInUser = {
      name: user.displayName,
      img: user.photoURL,
      email: user.email,
      id: user.uid
    }
  }

 /**
  * user will be sign out and the browser navigate to checkIn site
  */
  async logOut() {
    try {
      const auth = getAuth();
      await signOut(auth);
    } catch (error) {
      console.error("Fehler beim Ausloggen:", error);
    }
    this.router.navigate(['/']);
  }

  async updateFireUser(auth:Auth, key: any, value : string) {
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, {
      displayName : value
      }).then(() => {
      // Profile updated!
      }).catch((error) => {
      // An error occurred
      // ...
      });
    }
  }
}

