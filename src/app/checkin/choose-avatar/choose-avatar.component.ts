import { Component } from '@angular/core';
import { CheckInSiteServiceService } from 'src/app/services/generally/check-in-site-service.service';
import { CreateAccountService } from 'src/app/services/userDatas/create-account.service';
import { UserProfilesService } from 'src/app/services/userDatas/user-profiles.service';


@Component({
  selector: 'app-choose-avatar',
  templateUrl: './choose-avatar.component.html',
  styleUrls: ['./choose-avatar.component.scss']
})
export class ChooseAvatarComponent {

  creatingAccount : boolean = false;

  constructor(
    public checkInSiteServiceService: CheckInSiteServiceService,
    public createAccountService: CreateAccountService,
    private userProfileService: UserProfilesService,
  ) {  }

 
  async finishCreateAccount() {
    this.creatingAccount = true;
    await this.createAccountService.createAccount();
    this.creatingAccount = false;
    setTimeout(() => {
      this.checkInSiteServiceService.changeCheckInSite('logIn');
    }, 2000);
    this.userProfileService.addProfile();
  }

}


