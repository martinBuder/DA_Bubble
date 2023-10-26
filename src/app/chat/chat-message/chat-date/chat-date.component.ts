import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chat-date',
  templateUrl: './chat-date.component.html',
  styleUrls: ['./chat-date.component.scss']
})
export class ChatDateComponent {

  @Input() date !: string
}
