import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  firstTime: boolean = true;

  ngOnInit(): void {
    this.firstTimeToFalse();
  }

  firstTimeToFalse() {
    setTimeout(() => {
      this.firstTime = false;
    }, 3800);
  }
}
