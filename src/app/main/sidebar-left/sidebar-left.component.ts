import { Component } from '@angular/core';
import { ChatHeadDatasService } from 'src/app/services/chat-head-datas.service';

@Component({
  selector: 'app-sidebar-left',
  templateUrl: './sidebar-left.component.html',
  styleUrls: ['./sidebar-left.component.scss']
})
export class SidebarLeftComponent {

  constructor(
    public chatHeadDatasService: ChatHeadDatasService
    ){
     
    };

}
