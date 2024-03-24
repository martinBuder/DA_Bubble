import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FireAuthService } from 'src/app/services/firebase/fire-auth.service';
import { OpenCloseService } from 'src/app/services/generally/open-close.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit{

  protected currentPath !: string;

  constructor(
    public openCloseService: OpenCloseService,
    private fireAuthService: FireAuthService,
    public router: Router,
  ) {};

  ngOnInit(): void {
    this.currentPath = this.router.url;
  }

  async logOut() {
    await this.fireAuthService.fireLogOut();
    this.navigateToSite('/');
  }

  openProfile() {
    this.openCloseService.navOpen = false;
    this.openCloseService.openOwnProfile = true;
  }

  navigateToSite(site: string) {
    this.router.navigate([site]);
    this.openCloseService.navOpen = false;
  }
  
}
