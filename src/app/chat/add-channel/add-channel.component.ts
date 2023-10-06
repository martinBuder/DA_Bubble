import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChatService } from 'src/app/services/chat.service';
import { UserDatasService } from 'src/app/services/user-datas.service';

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
    public chatService: ChatService,
    private userDatasService: UserDatasService,
    ){ };

}
