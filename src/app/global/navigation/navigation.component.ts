import { Component } from '@angular/core';
import { ThreadOpenCloseService } from 'src/app/services/thread-open-close.service';
import { UserDatasService } from 'src/app/services/user-datas.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  constructor(
    public userDatasService: UserDatasService,
    public openerService: ThreadOpenCloseService,
  ) {};
  
}
