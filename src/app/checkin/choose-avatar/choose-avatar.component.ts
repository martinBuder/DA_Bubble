import { Component } from '@angular/core';
import { CheckInSiteServiceService } from 'src/app/services/check-in-site-service.service';

@Component({
  selector: 'app-choose-avatar',
  templateUrl: './choose-avatar.component.html',
  styleUrls: ['./choose-avatar.component.scss']
})
export class ChooseAvatarComponent {
  constructor(public checkInSiteServiceService: CheckInSiteServiceService) {}
}
