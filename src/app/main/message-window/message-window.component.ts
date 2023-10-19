import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-message-window',
  templateUrl: './message-window.component.html',
  styleUrls: ['./message-window.component.scss']
})
export class MessageWindowComponent {
  
  public channelFinderForm: FormGroup = new FormGroup({
    recipient: new FormControl('', [], []),
  });

  constructor(){
    this.channelFinderForm.valueChanges.subscribe(
    console.log
      
      // this.searchChatMember.bind(this)
    );
  }
}
