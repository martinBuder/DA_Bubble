import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { CheckInSiteServiceService } from 'src/app/services/check-in-site-service.service';


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
    ) {

    this.logInForm.valueChanges.subscribe();

  }

  logIn() {
    this.isLoggingIn = true; 
    const auth = getAuth();
      signInWithEmailAndPassword(auth, this.logInForm.value.email, this.logInForm.value.password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          this.routerLink.navigate(['/chat']);
          // ...
        })
        .catch((error) => {
          this.isLoggingIn = false;
          const errorCode = error.code;
          const errorMessage = error.message;
        });

    // this.authService.logIn( {
    //   email: this.logInForm.value.email,
    //   password: this.logInForm.value.password
    // }).subscribe(() => {
    //     this.routerLink.navigate(['/chat']);
    //   },(error: any) => {
    //     this.isLoggingIn = false;
    //   })
  }

  googleLogIn() {
   

  }

}
