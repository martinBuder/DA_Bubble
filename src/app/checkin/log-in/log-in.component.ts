import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CheckInSiteServiceService } from 'src/app/services/generally/check-in-site-service.service';

import { FireAuthService } from 'src/app/services/firebase/fire-auth.service';



@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent {

  isLoggingIn : boolean = false;
  errorMessage: string | null = null


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
 

  constructor(
    private fireAuthService: FireAuthService,
    public checkInSiteServiceService: CheckInSiteServiceService,
    private router: Router,
    ) { }


   async logIn(email: string, password: string) {
    this.isLoggingIn = true; 
    await this.fireAuthService.fireLogIn(email, password);
    this.goToNextPage();
    this.isLoggingIn = false; 
  }

 
  /**
   * log in with google 
   */
  async googleLogIn() {
    this.isLoggingIn = true; 
    await this.fireAuthService.googleFireLogIn();
    this.goToNextPage();
    this.isLoggingIn = false;
  }

  

  /**
   * go to the chatpage
   */
  goToNextPage() {
    this.router.navigate(['/chat']);
  }

}
