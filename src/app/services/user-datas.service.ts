import { Injectable } from '@angular/core';
import { getAuth, signOut } from '@angular/fire/auth';
import { User } from '@firebase/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserDatasService {
  
  public loggedInUser: any = {}; 
  // Hier kannst du die Benutzerinformationen speichern
  
  constructor(private router: Router) {
    this.getUserFromLocalStorage();
  }
  
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
}

