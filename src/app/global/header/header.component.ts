import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserDatasService } from 'src/app/services/user-datas.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  navOpen : boolean = true;

  constructor(
    public router: Router,
    public userDatasService: UserDatasService,
    ) { }

   

  

}
