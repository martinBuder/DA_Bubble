import { Injectable } from '@angular/core';
import { ChatConfig } from '../interfaces/chat-config';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  chatData !: ChatConfig;

 

  constructor() { }
}
