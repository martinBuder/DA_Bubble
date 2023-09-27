import { Component, Input } from '@angular/core';
import { UserDatasService } from 'src/app/services/user-datas.service';
import { Router } from '@angular/router';
import { getAuth, signOut } from "firebase/auth";
import { initializeApp } from 'firebase/app'; 
import { environment } from 'src/environments/environment';

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
