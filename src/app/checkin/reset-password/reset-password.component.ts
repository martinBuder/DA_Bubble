import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CheckInSiteServiceService } from 'src/app/services/generally/check-in-site-service.service';
import { getAuth, updatePassword } from "firebase/auth";
import { matchpassword } from 'src/app/validators/matchpassword.validator';
import { Auth } from '@angular/fire/auth';

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
      private auth : Auth) {}

    /**
     * update the new password in firebase
     */
    async resetPassword() {
      this.auth = getAuth();
      const user = this.auth.currentUser;
      const newPassword = this.resetPasswordForm.value.password;
      if (user !== null) {
        await updatePassword(user, newPassword).then(() => {
          this.successfulMessage = 'Passwort erfolgreich geändert.';
          setTimeout(() => {
            this.successfulMessage = null;
          }, 2000);
        }).catch((error) => {
          if(error)
            this.errorMessage = 'Da ist leider etwas schief gegangen. Bitte versuche es noch mal.';
            setTimeout(() => {
              this.errorMessage = null;
            }, 2000);
        });
      }
    }
  }
