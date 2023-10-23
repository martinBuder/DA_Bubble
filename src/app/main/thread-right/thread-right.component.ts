import { Component } from '@angular/core';
import { OpenCloseService } from 'src/app/services/open-close.service';

@Component({
  selector: 'app-thread-right',
  templateUrl: './thread-right.component.html',
  styleUrls: ['./thread-right.component.scss']
})
export class ThreadRightComponent {

  constructor(
    public openCloseService: OpenCloseService){};
}
