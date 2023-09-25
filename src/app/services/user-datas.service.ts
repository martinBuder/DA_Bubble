import { Injectable } from '@angular/core';
import { User } from '@firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class UserDatasService {
  
  public loggedInUser: any; 
  // Hier kannst du die Benutzerinformationen speichern
  
  constructor() {}
  
    // Methode, um den eingeloggten Benutzer zu setzen
  setLoggedInUser(user: any) {
    this.loggedInUser = user;
    console.log(this.loggedInUser);
    
  }
  
    // Methode, um den eingeloggten Benutzer abzurufen
  getLoggedInUser(): any {
    return this.loggedInUser;
  }
}

