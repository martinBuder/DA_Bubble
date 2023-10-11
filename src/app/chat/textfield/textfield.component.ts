import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import ChatMessageService from 'src/app/services/chat-message.service';


@Component({
  selector: 'app-textfield',
  templateUrl: './textfield.component.html',
  styleUrls: ['./textfield.component.scss']
})
export class TextfieldComponent {

  public textfieldForm : FormGroup = new FormGroup({
   
    textarea: new FormControl ('', [
      Validators.required,
    ], []),

  });

  constructor(
    public chatMessageService: ChatMessageService,
    ) { }

  sendMessage(inputText: string) {
    this.chatMessageService.messageText = inputText;
    this.chatMessageService.setMessageDatas();
    this.chatMessageService.addFireMessage();
  }

  
}
