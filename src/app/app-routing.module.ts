import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckInComponent } from './checkin/check-in/check-in.component';
import { ChatSiteComponent } from './main/chat-site/chat-site.component';
import { ImprintComponent } from './others/imprint/imprint.component';
import { LegalNoticeComponent } from './others/legal-notice/legal-notice.component';

const routes: Routes = [
  { path: '', component: CheckInComponent },
  { path: 'chat', component: ChatSiteComponent },
  { path: 'impressum', component: ImprintComponent },
  { path: 'datenschutz', component: LegalNoticeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
