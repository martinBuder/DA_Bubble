import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FireAuthService } from 'src/app/services/firebase/fire-auth.service';
import { OpenCloseService } from 'src/app/services/generally/open-close.service';
import { UserDatasService } from 'src/app/services/userDatas/user-datas.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  constructor(
    public openCloseService: OpenCloseService,
    private fireAuthService: FireAuthService,
    public userDatasService: UserDatasService,
    private router: Router,
  ) {};

  async logOut() {
    await this.fireAuthService.fireLogOut();
    this.router.navigate(['/']);
  }
  
}
