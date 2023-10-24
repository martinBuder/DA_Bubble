import { Component } from '@angular/core';
import { OpenCloseService } from 'src/app/services/generally/open-close.service';
import { UserDatasService } from 'src/app/services/userDatas/user-datas.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  constructor(
    public userDatasService: UserDatasService,
    public openCloseService: OpenCloseService,
  ) {};
  
}
