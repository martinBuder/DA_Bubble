import { Component } from '@angular/core';
import { getAuth, sendPasswordResetEmail } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CheckInSiteServiceService } from 'src/app/services/generally/check-in-site-service.service';

@Component({
  selector: 'app-reset-email',
  templateUrl: './reset-email.component.html',
  styleUrls: ['./reset-email.component.scss']
})
export class ResetEmailComponent {

   /**
   * this is the validation for the input fields
   */
   public resetMailForm : FormGroup = new FormGroup({
   
    email: new FormControl ('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
    ], []),
   });

   //router is just for testing

   constructor(
    public checkInSiteServiceService: CheckInSiteServiceService,
    private router: Router,
    ){};

   sendResetPasswordMail() {
    const auth = getAuth();
    // sendPasswordResetEmail(auth, this.resetMailForm.value.email)
    this.nothing()
    // .then(() => {
    //   // Password reset email sen
    //   this.router.navigate(['/?checkInSite=resetPassword'])
    // })
    // .catch((error) => {
    //   const errorCode = error.code;
    //   console.log(errorCode);
      
    // });
   }

   nothing() {
    this.router.navigate(['/resetPassword'])
   }

}
