import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CheckInSiteServiceService } from 'src/app/services/check-in-site-service.service';

@Component({
  selector: 'app-reset-email',
  templateUrl: './reset-email.component.html',
  styleUrls: ['./reset-email.component.scss']
})
export class ResetEmailComponent {

   /**
   * this is the validation for the input fields
   */
   public logInForm : FormGroup = new FormGroup({
   
    email: new FormControl ('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
    ], []),
   });

   constructor(public checkInSiteServiceService: CheckInSiteServiceService){};

   sendResetMail() {

   }

}
