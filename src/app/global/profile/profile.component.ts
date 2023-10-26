import { Component } from '@angular/core';
import { UserProfilesService } from 'src/app/services/userDatas/user-profiles.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  
  constructor(
    public userProfilesService: UserProfilesService
    ){ }

  writeMessage(contactProfile : any) {

  }
}
