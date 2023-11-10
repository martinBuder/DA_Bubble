import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import ChatMessageService from 'src/app/services/chatDatas/chat-message.service';


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

  /**
   * send the message to the others
   * 
   * @param inputText value from the textareafield
   */
  sendMessage(inputText: string) {
    this.chatMessageService.messageText = inputText;
    this.chatMessageService.setMessageDatas();
    this.chatMessageService.sendMessage();
    this.clearTextarea(this.textfieldForm);
  }

  /**
   * clear forms
   * 
   * @param Form name of the reactiveForm
   */
  clearTextarea(Form:any) {
    Form.reset();
  }
  
}
