import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CheckInSiteServiceService } from 'src/app/services/check-in-site-service.service';

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
      ], []),
      confirmPassword: new FormControl ('', [
        Validators.required,
        this.matchEmails.bind(this)
      ], []),
    });



    constructor(public checkInSiteServiceService: CheckInSiteServiceService){};

    matchEmails(control: FormControl): { [key: string]: any } | null {
      const password = this.resetPasswordForm.get('password')!.value;
      const confirmPassword = control.value;
  
      if (password !== confirmPassword) {
        return { 'passwordMismatch': true }; // Validierungsfehler, wenn die E-Mails nicht übereinstimmen
      }
  
      return null; // Kein Fehler, wenn die E-Mails übereinstimmen
    }

    resetPassword() {
      alert('Now we can change the password.')
    }


}
