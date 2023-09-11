import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CheckInSiteServiceService } from 'src/app/services/check-in-site-service.service';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent {

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

  constructor(public checkInSiteServiceService: CheckInSiteServiceService) {
    this.logInForm.valueChanges.subscribe();
  }

  logIn() {

  }

  googleLogIn() {

  }

}
