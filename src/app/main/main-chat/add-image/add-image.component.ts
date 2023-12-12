import { Component } from '@angular/core';
import { OpenCloseService } from 'src/app/services/generally/open-close.service';

@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.scss']
})
export class AddImageComponent {

  constructor(
    public openCloseService : OpenCloseService,
  ) {

  }

}
