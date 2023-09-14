import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CheckInSiteServiceService } from 'src/app/services/check-in-site-service.service';
import { matchpassword } from 'src/app/validators/matchpassword.validator';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
    /**
   * this is the validation for the input fields
   */
  public resetPasswordForm : FormGroup = new FormGroup({
   
      password: new FormControl ('', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?\-+'#()\/=}{§"!?&])[A-Za-z\d@$!%*?\-+'#()\/=}{§"!?&]+$/),
        Validators.minLength(8)
      ]),
      confirmPassword: new FormControl ('', [
        Validators.required,
      ]),
    },
    {
      validators:matchpassword
    });

    constructor(public checkInSiteServiceService: CheckInSiteServiceService) {}

   




    resetPassword() {
      alert('Now we can change the password.')
    }


  }
