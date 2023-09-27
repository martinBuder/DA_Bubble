import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from 'firebase/app'; 
import { environment } from 'src/environments/environment';
import { CheckInSiteServiceService } from 'src/app/services/check-in-site-service.service';
import { UserDatasService } from 'src/app/services/user-datas.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent {

  isLoggingIn : boolean = false

   /**
   * this is the validation for the input fields
   */
  public logInForm : FormGroup = new FormGroup({
   
    email: new FormControl ('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
    ], []),
    password: new FormControl ('', [
      Validators.required,
      Validators.minLength(8)
    ], [])
  });
  routerLink: any;

  constructor(
    public checkInSiteServiceService: CheckInSiteServiceService,
    private userDatasService: UserDatasService,
    private router: Router
    ) {
    this.logInForm.valueChanges.subscribe();
  }

  firebaseApp = initializeApp(environment.firebase);

  async logIn() {
    this.isLoggingIn = true; 
    const auth = getAuth();
      await signInWithEmailAndPassword(auth, this.logInForm.value.email, this.logInForm.value.password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          this.userDatasService.setLoggedInUser(user);
          this.router.navigate(['/chat']);
        })
        .catch((error) => {
          this.isLoggingIn = false;
          const errorCode = error.code;
          const errorMessage = error.message;
        });
  }

  async googleLogIn() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    await signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (credential !== null) {
         const token = credential.accessToken;
        }
        // The signed-in user info.
        const user = result.user;
        this.userDatasService.setLoggedInUser(user);
        this.userDatasService.saveUserInLocalStorage(this.userDatasService.loggedInUser);
        
        this.router.navigate(['/chat']);
       
     
        
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });

  }
}
