import { Component } from '@angular/core';
import { FireAuthService } from 'src/app/services/firebase/fire-auth.service';
import { CheckInSiteServiceService } from 'src/app/services/generally/check-in-site-service.service';
import { OpenCloseService } from 'src/app/services/generally/open-close.service';
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
    public fireAuthService: FireAuthService,
    public checkInSiteServiceService: CheckInSiteServiceService,
    public createAccountService: CreateAccountService,
    private userProfileService: UserProfilesService,
    public openCloseService: OpenCloseService
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

  toggleImgUploadOpen() {
    this.openCloseService.imgUploadOpen = !this.openCloseService.imgUploadOpen;
  }

}


