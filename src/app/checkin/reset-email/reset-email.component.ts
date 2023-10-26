import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FireAuthService } from 'src/app/services/firebase/fire-auth.service';
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
    private fireAuthService: FireAuthService,
    public checkInSiteServiceService: CheckInSiteServiceService,
    private router: Router,
    ){};

  async sendResetPasswordMail() {
    await this.fireAuthService.sendFireResetMail(this.resetMailForm.value.email);
    // !for testing
    // this.nothing();
   }

  //  !for testing
  //  nothing() {
  //   this.router.navigate(['/resetPassword'])
  //  }

}
