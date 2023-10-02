import { Injectable } from '@angular/core';
import { CheckInSiteServiceService } from './check-in-site-service.service';
import { UserDatasService } from './user-datas.service';
import { Auth } from '@angular/fire/auth';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CreateAccountService {

  profileName : string = 'Gast';
  profileImg : string = 'assets/img/avatars/person-0.png';
  email !: string;
  password !: string;

  errorMessage: string | null = null;
  successfulMessage: string | null = null;

  constructor(
    public checkInSiteServiceService: CheckInSiteServiceService,
    public userDatasService: UserDatasService,
    public auth: Auth,
  ) { }

  firebaseApp = initializeApp(environment.firebase);


  /**
   * create account on firebase
   */
  async createAccount() {
    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        this.email,
        this.password
      );
  
      // Signed in
      const user = userCredential.user;
      
      // Profile-Daten aktualisieren
      await this.userDatasService.updateFireUser(auth, 'displayName', this.profileName);
      await this.userDatasService.updateFireUser(auth, 'photoURL', this.profileImg);
      this.successfulMessage = 'Account erfolgreich erstellt.';
      setTimeout(() => {
        this.successfulMessage = null;
      }, 2000);
    } catch (error: any) {
      const errorCode = error.code;
      console.log(errorCode);
      if (errorCode === 'auth/email-already-in-use') {
        this.errorMessage = 'Dieser Benutzer hat bereits ein Konto.';
      } else {
        this.errorMessage = 'Dieser Benutzer hat bereits ein Konto.';
      }
      await this.userDatasService.logOut();
      setTimeout(() => {
        this.errorMessage = null;
      }, 2000);

    }
   
  }
}
