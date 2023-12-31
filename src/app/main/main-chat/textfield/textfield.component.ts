import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import ChatMessageService from 'src/app/services/chatDatas/chat-message.service';
import { EmojisService } from 'src/app/services/generally/emojis.service';
import { OpenCloseService } from 'src/app/services/generally/open-close.service';


@Component({
  selector: 'app-textfield',
  templateUrl: './textfield.component.html',
  styleUrls: ['./textfield.component.scss']
})
export class TextfieldComponent {

  @Input() chatOrThread !: string; 

  allEmojis!: Array<any>;
  textEmojisOpen : boolean = false;

  public textfieldForm : FormGroup = new FormGroup({
   
    textarea: new FormControl ('', [
      Validators.required,
    ], []),

  });

  constructor(
    public chatMessageService: ChatMessageService,
    private emojisService: EmojisService,
    public openCloseService: OpenCloseService,
    ) { 
      this.allEmojis = this.emojisService.getAllEmoijs();
    }


  /**
   * send the message to the others
   * 
   * @param inputText value from the textareafield
   */
  async sendMessage(inputText: string) {       
    this.chatMessageService.messageText = inputText;
    this.chatMessageService.setMessageDatas();
    await this.chatMessageService.sendMessage(this.chatOrThread);
    if(!this.chatMessageService.noSelectedContact)
      this.clearTextarea(this.textfieldForm);
    setTimeout(() => {
      this.chatMessageService.noSelectedContact = false;
    }, 2000);
  }

  /**
   * clear forms
   * 
   * @param Form name of the reactiveForm
   */
  clearTextarea(Form:any) {
    Form.reset();
  }

  toggleEmojis() {
    this.textEmojisOpen = !this.textEmojisOpen;
  }

  selectEmoji(emoji: string) {
    this.textfieldForm.get('textarea')?.setValue(this.textfieldForm.value.textarea + emoji);
    this.textEmojisOpen = false;
  }

  toogleOpenImage(chatOrThread: string) {
    this.openCloseService.openImage = !this.openCloseService.openImage; 
    this.openCloseService.chatOrThread = chatOrThread;
  }
  
}
