import { Component } from '@angular/core';
import { CheckInSiteServiceService } from 'src/app/services/generally/check-in-site-service.service';


@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.scss']
})
export class CheckInComponent {
  firstTime: boolean = true;
  checkInSite !: string;


  constructor(public checkInSiteServiceService: CheckInSiteServiceService){};
  

  ngOnInit(): void {
    this.firstTimeToFalse();
    this.comesFromResetPasswordMail();
  }

  /**
   * check if this the first time after reload that we gone to check in site
   *  --> for start-animation start
   */
  firstTimeToFalse() {
    setTimeout(() => {
      this.firstTime = false;
    }, 3800);
  }

  /**
   * check if we comes from reset Password mail then go to the right form
   */
  comesFromResetPasswordMail() {
    if (window.location.pathname === '/resetPassword') {
      this.checkInSiteServiceService.checkInSite = 'resetPassword'
    }
  }


}
