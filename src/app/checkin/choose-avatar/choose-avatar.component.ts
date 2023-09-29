import { Component } from '@angular/core';
import { CheckInSiteServiceService } from 'src/app/services/check-in-site-service.service';
import { CreateAccountService } from 'src/app/services/create-account.service';


@Component({
  selector: 'app-choose-avatar',
  templateUrl: './choose-avatar.component.html',
  styleUrls: ['./choose-avatar.component.scss']
})
export class ChooseAvatarComponent {

  creatingAccount : boolean = false;

  constructor(
    public checkInSiteServiceService: CheckInSiteServiceService,
    public createAccountService: CreateAccountService
  ) {  }

 
  async finishCreateAccount() {
    this.creatingAccount = true;
    // ! hier kommt ein spinner
    await this.createAccountService.createAccount();
    this.creatingAccount = false;
    // ! Hier kommt eine Message
    console.log('finish');
    this.checkInSiteServiceService.changeCheckInSite('logIn');
  }
}


