import { Component } from '@angular/core';
import { CheckInSiteServiceService } from 'src/app/services/check-in-site-service.service';


@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.scss']
})
export class CheckInComponent {
  firstTime: boolean = true;

  constructor(public checkInSiteServiceService: CheckInSiteServiceService){};
  

  ngOnInit(): void {
    this.firstTimeToFalse();
  }

  firstTimeToFalse() {
    setTimeout(() => {
      this.firstTime = false;
    }, 3800);
  }


}
