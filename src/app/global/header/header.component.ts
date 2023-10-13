import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDatasService } from 'src/app/services/user-datas.service';
import { User } from '@firebase/auth';
import { ThreadOpenCloseService } from 'src/app/services/thread-open-close.service';


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
    public openerService: ThreadOpenCloseService,
    ) { 
    }

  

   

  

}
