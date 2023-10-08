import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OpenedChannelService } from 'src/app/services/opened-channel.service';

@Component({
  selector: 'app-add-chat-members',
  templateUrl: './add-chat-members.component.html',
  styleUrls: ['./add-chat-members.component.scss']
})
export class AddChatMembersComponent {

  public chatAddMemberForm : FormGroup = new FormGroup({
   
    member: new FormControl ('', [
      Validators.required,
    ], []),

  });
  
  constructor(
    public openedChannelService: OpenedChannelService,
  ) {
    
    this.chatAddMemberForm.valueChanges.subscribe(console.log)
  }

  addChatMember(member: string) {
    console.log(member);
    
  }

}
