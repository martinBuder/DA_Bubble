import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CheckInSiteServiceService } from 'src/app/services/generally/check-in-site-service.service';
import { matchpassword } from 'src/app/validators/matchpassword.validator';
import { FireAuthService } from 'src/app/services/firebase/fire-auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {

  errorMessage: string | null = null;
  successfulMessage: string | null = null;

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

    constructor(
      public checkInSiteServiceService: CheckInSiteServiceService,
      private fireAuthService: FireAuthService
    ) {}

    /**
     * update the new password in firebase
     */
    async resetPassword() {
     await this.fireAuthService.resetFireAuth(this.resetPasswordForm.value.password)
    }
  }
