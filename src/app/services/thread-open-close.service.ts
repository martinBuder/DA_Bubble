import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThreadOpenCloseService {

  threadOpen : boolean = true;
  navOpen : boolean = false;

  constructor() { }
}
