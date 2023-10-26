import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChatHeadDatasService } from 'src/app/services/chatDatas/channel-head-datas.service';


@Component({
  selector: 'app-add-channel',
  templateUrl: './add-channel.component.html',
  styleUrls: ['./add-channel.component.scss']
})
export class AddChannelComponent {

  public createChannelForm : FormGroup = new FormGroup({
   
    channelHeader: new FormControl ('', [
      Validators.required,
    ], []),
    channelDescription: new FormControl ('', [], []),

  });

  

  constructor(
    public chatHeadDatasService: ChatHeadDatasService,
    ){ };

}
