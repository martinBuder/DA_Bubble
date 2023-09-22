import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, signOut } from "firebase/auth";
import { initializeApp } from 'firebase/app'; 
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  @Input() navOpen : boolean = false;

  constructor(private router: Router) {}
  firebaseApp = initializeApp(environment.firebase);

  async logOut() {
    const auth = getAuth();
    await signOut(auth).then(() => {
      this.router.navigate(['/']);
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }
}
