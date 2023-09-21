import { Component } from '@angular/core';
import { ThreadOpenCloseService } from 'src/app/services/thread-open-close.service';

@Component({
  selector: 'app-thread-right',
  templateUrl: './thread-right.component.html',
  styleUrls: ['./thread-right.component.scss']
})
export class ThreadRightComponent {

  constructor(public threadOpenCloseService: ThreadOpenCloseService){};
}
