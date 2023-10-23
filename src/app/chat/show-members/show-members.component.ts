import { Component } from '@angular/core';
import { ContactsService } from 'src/app/services/contacts.service';

@Component({
  selector: 'app-show-members',
  templateUrl: './show-members.component.html',
  styleUrls: ['./show-members.component.scss']
})
export class ShowMembersComponent {
  contactsOpen : boolean = true;

  constructor(
    public contactService: ContactsService,
  ) {}

  openContactChat(i: number) {

  }
}
