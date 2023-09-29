import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CheckInSiteServiceService } from 'src/app/services/check-in-site-service.service';
import { CreateAccountService } from 'src/app/services/create-account.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  /**
   * this is the validation for the input fields
   */
  public signInForm: FormGroup = new FormGroup({
    email: new FormControl(
      '',
      [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/),
      ],
      []
    ),
    name: new FormControl(
      '',
      [Validators.required, Validators.pattern(/^[a-zA-ZäöüÄÖÜß.-]+ [a-zA-Z0-9äöüÄÖÜß.-]+$/)],
      []
    ),
    password: new FormControl(
      '',
      [
        Validators.required,
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?\-+'#()\/=}{§"!?&])[A-Za-z\d@$!%*?\-+'#()\/=}{§"!?&]+$/
        ),
        Validators.minLength(8),
      ],
      []
    ),
    terms: new FormControl('', [Validators.required], []),
  });

  constructor(
    public checkInSiteServiceService: CheckInSiteServiceService,
    private createAccountService: CreateAccountService
  ) {}

  /**
   * go to next step
   */
  goToChooseAvatar() {
    this.saveNewUserInCreateAccount();
    this.checkInSiteServiceService.changeCheckInSite('chooseAvatar');
  }

  /**
   * save datas in createAccountService 
   */
  saveNewUserInCreateAccount() {
    this.createAccountService.profileName = this.signInForm.value.name;
    this.createAccountService.email = this.signInForm.value.email;
    this.createAccountService.password = this.signInForm.value.password;
  }
}
