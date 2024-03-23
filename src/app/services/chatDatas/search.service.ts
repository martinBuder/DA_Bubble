import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Message } from 'src/app/interfaces/message';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  searchInput = new FormControl(''); 
  searchMessageArray : Array<Message> = [];
  searchMessageCopy : Array<Message> = [];

  constructor() { 
    this.searchInput.valueChanges.subscribe( value => {
      if(value !== null) {
        this.searchMessageCopy = this.searchMessageArray.filter(message =>
          message.text.toLowerCase().includes(value.toLowerCase())
        )
      }
     else this.searchMessageCopy = this.searchMessageArray;
    })
  }
}
