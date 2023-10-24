import { Injectable } from '@angular/core';
import { initializeApp } from '@angular/fire/app';
import { Auth, createUserWithEmailAndPassword, getAuth } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FireAuthService {

  constructor(
    private auth: Auth,
  ) { }

  firebaseApp = initializeApp(environment.firebase);

  async createFireUser(email: string, password: string) {
    this.auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );  
      // Signed in
      const user = userCredential.user;
      
      // Profile-Daten aktualisieren
      await this.userDatasService.updateFireUser(this.auth, 'displayName', this.profileName);
      await this.userDatasService.updateFireUser(this.auth, 'photoURL', this.profileImg);
      this.successfulMessage = 'Account erfolgreich erstellt.';
      setTimeout(() => {
        this.successfulMessage = null;
      }, 2000);
    } catch (error: any) {
      const errorCode = error.code;
      if (errorCode === 'this.auth/email-already-in-use') {
        this.errorMessage = 'Dieser Benutzer hat bereits ein Konto.';
      } else {
        this.errorMessage = 'Da ist leider was schief gelaufen.';
      }
      await this.userDatasService.logOut();
      setTimeout(() => {
        this.errorMessage = null;
      }, 2000);

    }
   
  }
}
