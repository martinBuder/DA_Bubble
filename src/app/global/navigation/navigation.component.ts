import { Component, Input } from '@angular/core';
import { UserDatasService } from 'src/app/services/user-datas.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  @Input() navOpen : boolean = false;

  constructor(
    public userDatasService: UserDatasService,
  ) {

    this.navOpen = false;

  }
  
}
