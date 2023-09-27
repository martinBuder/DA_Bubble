import { Injectable } from '@angular/core';
import { getAuth, onAuthStateChanged, signInWithCustomToken, signOut } from '@angular/fire/auth';
import { User } from '@firebase/auth';
import { Router } from '@angular/router';
import { initializeApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserDatasService {
  
  public loggedInUser: any = {}; 
  
  
  constructor(private router: Router) {

    // const auth = getAuth();

    this.getUserFromLocalStorage();
    // this.reloadUser();
    console.log(this.loggedInUser.refresh.refreshToken)
    
  }


  // firebaseApp = initializeApp(environment.firebase);


  // async reloadUser() {
  //   const auth = getAuth();

  //   if (this.loggedInUser) {
  //     // Verwenden Sie das Refresh-Token, um sich erneut bei Firebase anzumelden
  //     await signInWithCustomToken(auth, this.loggedInUser.refresh.refreshToken)
  //       .then((userCredential) => {
  //         const user = userCredential.user;
  //         console.log('Benutzer erfolgreich erneut angemeldet:', user);
  //       })
  //       .catch((error) => {
  //         console.error('Fehler bei der erneuten Anmeldung:', error);
  //       });
  //   }
  // }

  //  isLoggedIn(): boolean {
  //   return this.user !== null;
  // }
  
  
  /**
   * set the firebase user to my own user
   * 
   * @param user firebase user
   */
  setLoggedInUser(user: any) {
    this.loggedInUser = {
      name: user.displayName,
      img: user.photoURL,
      email: user.email,
      id: user.uid,
      refresh: user.stsTokenManager 
  }

  console.log(this.loggedInUser);
  
  }
  

  async logOut() {
    const auth = getAuth();
    await signOut(auth).then(() => {
      this.router.navigate(['/']);
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
    this.deleteUserFromLocalStorage()
  }

  // work with local storage

  /**
   * save user in local storage for refresh
   * 
   * @param user 
   */
  saveUserInLocalStorage(user : any) {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
  }

  /**
   * get the saved user from local storage
   */
  getUserFromLocalStorage() {
    const savedUser = localStorage.getItem('loggedInUser');
    if (savedUser) {
      this.loggedInUser = JSON.parse(savedUser);
    }
  }

  /**
   * delete User from local storage for log out
   */
  deleteUserFromLocalStorage() {
   localStorage.removeItem('loggedInUser');
  }



  checkIfUserIsActive() {
    let lastActivityTime = Date.now();

    // Überwachen Sie die Aktivität im Browser
    document.addEventListener('mousemove', () => {
      lastActivityTime = Date.now();
    });

    // Prüfen Sie regelmäßig, ob der Benutzer ausgeloggt werden sollte
    setInterval(() => {
      const currentTime = Date.now();
      const inactivityDuration = currentTime - lastActivityTime;
      const maxInactivityDuration = 10 * 60 * 1000; // 10 Minuten inaktiv

      if (inactivityDuration >= maxInactivityDuration) {
        // Der Benutzer war inaktiv. Führen Sie hier die Logout-Funktion aus.
        // Beispiel: authService.logout();
      }
    }, 1000); // Überprüfen Sie alle 1 Sekunde auf Inaktivität
  }
}

