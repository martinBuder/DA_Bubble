import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CheckInSiteServiceService } from 'src/app/services/check-in-site-service.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
   /**
   * this is the validation for the input fields
   */
   public signInForm : FormGroup = new FormGroup({
   
    email: new FormControl ('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
    ], []),
    name: new FormControl ('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z.-]+ [a-zA-Z0-9.-]+$/)
    ], []),
    password: new FormControl ('', [
      Validators.required,
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?\-+'#()\/=}{§"!?&])[A-Za-z\d@$!%*?\-+'#()\/=}{§"!?&]+$/),
      Validators.minLength(8)
    ], []),
    terms: new FormControl
    ('', [
      Validators.required
    ], []),  
     });

   

   constructor(public checkInSiteServiceService: CheckInSiteServiceService){};

   createAccount() {

   }

}
