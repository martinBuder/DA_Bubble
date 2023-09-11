import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckInComponent } from './checkin/check-in/check-in.component';
import { MainChatComponent } from './main/main-chat/main-chat.component';

const routes: Routes = [
  { path: '', component: CheckInComponent },
  { path: 'chat', component: MainChatComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
