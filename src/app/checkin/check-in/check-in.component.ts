import { Component } from '@angular/core';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.scss']
})
export class CheckInComponent {
  firstTime: boolean = true;
  checkInSite: string = 'logIn'

  ngOnInit(): void {
    this.firstTimeToFalse();
  }

  firstTimeToFalse() {
    setTimeout(() => {
      this.firstTime = false;
    }, 3800);
  }
}
