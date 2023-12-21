import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FireAuthService } from 'src/app/services/firebase/fire-auth.service';
import { OpenCloseService } from 'src/app/services/generally/open-close.service';
import { UserProfilesService } from 'src/app/services/userDatas/user-profiles.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  constructor(
    public openCloseService: OpenCloseService,
    private fireAuthService: FireAuthService,
    private router: Router,
  ) {};

  async logOut() {
    await this.fireAuthService.fireLogOut();
    this.router.navigate(['/']);
  }

  openProfile() {
    this.openCloseService.navOpen = false;
    this.openCloseService.openOwnProfile = true;
  }
  
}
