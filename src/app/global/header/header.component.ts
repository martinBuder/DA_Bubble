import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OpenCloseService } from 'src/app/services/generally/open-close.service';
import { FireAuthService } from 'src/app/services/firebase/fire-auth.service';
import { FormControl } from '@angular/forms';
import { SearchService } from 'src/app/services/chatDatas/search.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  
  navOpen : boolean = true;


  

  constructor(
    public openCloseService: OpenCloseService,
    public fireAuthService: FireAuthService,
    public router: Router,
    public searchService: SearchService,
    ) { 

  
    }

  

   

  

}
