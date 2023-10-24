import { Injectable } from '@angular/core';
import { initializeApp } from '@angular/fire/app';
import { Auth, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { UserProfilesService } from '../userDatas/user-profiles.service';

@Injectable({
  providedIn: 'root'
})
export class FireAuthService {

  fireUser : any = '';

  errorMessage: string | null = null;
  successfulMessage: string | null = null;

  constructor(
    private auth: Auth,
    private userProfilesService: UserProfilesService,

  ) { 
    this.getFirebaseAuth();
    this.checkFirebaseUser();
  }

  firebaseApp = initializeApp(environment.firebase);

  getFirebaseAuth() {
    this.auth = getAuth();
    // setPersistence(this.auth, browserLocalPersistence);
  }

  // *create Account
  async createFireUser(email: string, password: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );  
      this.fireUser = userCredential.user;
     
    } catch (error: any) {
        const errorCode = error.code;
        if (errorCode === 'this.auth/email-already-in-use') {
          this.errorMessage = 'Dieser Benutzer hat bereits ein Konto.';
        } else {
          this.errorMessage = 'Da ist leider was schief gelaufen.';
        }
     
      setTimeout(() => {
        this.errorMessage = null;
      }, 2000);
    }
  }

  async createdAccountMessage() {
    this.successfulMessage = 'Account erfolgreich erstellt.';
    setTimeout(() => {
      this.successfulMessage = null;
    }, 2000);
  }

  // *log in fire Account with email and password
  /**
   * normal log In with email and password and go to the next site-- we use firebase getAuth()
   */
  async fireLogIn(email: string, password:string) {
    await signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // this.userDatasService.setLoggedInUser(user);
        this.userProfilesService.handleProfileData(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        this.createErrorMessages(errorCode);
      })
  }

  /**
   * create the error messages while log In
   * 
   * @param errorCode 
   */
   createErrorMessages(errorCode: string) {
    if (errorCode === "auth/invalid-login-credentials") {
      this.errorMessage = "E-Mail und/oder Passwort ist nicht bekannt.";
    }else {
      this.errorMessage = "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.";
    }
    setTimeout(() => {
      this.errorMessage = null;
    }, 2000);
  }

  //* check in fire Account with google

  /**
   * log in with google sign in and go to the next site -- we use firebase getAuth()
   */
  async googleFireLogIn() {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(this.auth, provider)
          .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (credential !== null) {
         const token = credential.accessToken;
        }
        const user = result.user        
        // this.userDatasService.setLoggedInUser(user);
        this.userProfilesService.handleProfileData(user);
      })
      .catch((error) => {
        this.googleLogInErrorHandler(error);
      });
  }

  /**
   * handle the google errors
   * 
   * @param error 
   */
  googleLogInErrorHandler(error: any){
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
  }

  //* check the fire Account

    /**
   * check is there a active firebase user and something is changed on it
   * yes = make this user to loggeInUser
   * no = do nothing for checkout
   */
    async checkFirebaseUser() {
      this.auth.onAuthStateChanged((firebaseUser) => {
        this.fireUser = firebaseUser;        
      });
    }

  
  // * log out fire Account
  /**
   * change the firebase user datas
   * 
   * @param auth 
   * @param key firebase userJson key to change
   * @param value firebase userJson value to this key
   */
  async updateFireUser(key: any, value : string) {
    if (this.auth.currentUser) {
      await updateProfile(this.auth.currentUser, {
      [key] : value
      }).then(() => {
      // Profile updated!
      }).catch((error) => {
      // An error occurred
      // ...
      });
    }
  }
  
    /**
  * user will be sign out and the browser navigate to checkIn site
  */
    async fireLogOut() {
      try {
        const online = false;
        this.userProfilesService.setUserProfile(this.fireUser, online);  
        if(this.fireUser) {
          await this.userProfilesService.updateOnlinestatusToProfile(this.fireUser.uid); 
        }  
        await signOut(this.auth);
      } catch (error) {
        console.error("Fehler beim Ausloggen:", error);
      }
   
      console.log(this.fireUser);
      
  
    }  
}
