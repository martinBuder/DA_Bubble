import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getAuth, setPersistence, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, browserLocalPersistence } from "firebase/auth";
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

  auth : any;
  isLoggingIn : boolean = false;


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
 

  constructor(
    public checkInSiteServiceService: CheckInSiteServiceService,
    private userDatasService: UserDatasService,
    private router: Router,
    ) { 
      this.getFirebaseAuth()
     }

  firebaseApp = initializeApp(environment.firebase);

  /**
   * get the firebase authentification and changed the persistence - so we must  * check out the user -> when you reload the page the user isn't loged out - 
   * without local storage from us.
   */
  getFirebaseAuth() {
    this.auth = getAuth();
    setPersistence(this.auth, browserLocalPersistence);
  }

  /**
   * normal log In with email and password and go to the next site-- we use firebase getAuth()
   */
  async logIn() {
    this.isLoggingIn = true; 
    await signInWithEmailAndPassword(this.auth, this.logInForm.value.email, this.logInForm.value.password)
      .then((userCredential) => {
        const user = userCredential.user;
        this.userDatasService.setLoggedInUser(user);
        this.router.navigate(['/chat']);
        })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      })
    this.isLoggingIn = false;
  }

  /**
   * log in with google sign in and go to the next site -- we use firebase getAuth()
   */
  async googleLogIn() {
    this.isLoggingIn = true; 
    const provider = new GoogleAuthProvider();
    await signInWithPopup(this.auth, provider)
          .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (credential !== null) {
         const token = credential.accessToken;
        }
        // The signed-in user info.
        const user = result.user;
        this.userDatasService.setLoggedInUser(user);
        this.goToNextPage();
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
      this.isLoggingIn = false;
  }

  /**
   * go to the chatpage
   */
  goToNextPage() {
    this.router.navigate(['/chat']);
  }
}
