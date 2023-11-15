import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { AnimationComponent } from './checkin/animation/animation.component';
import { SignInComponent } from './checkin/sign-in/sign-in.component';
import { LogInComponent } from './checkin/log-in/log-in.component';
import { ChooseAvatarComponent } from './checkin/choose-avatar/choose-avatar.component';
import { ResetEmailComponent } from './checkin/reset-email/reset-email.component';
import { ResetPasswordComponent } from './checkin/reset-password/reset-password.component';
import { MainComponent } from './global/main/main.component';
import { HeaderComponent } from './global/header/header.component';
import { SearchComponent } from './global/search/search.component';
import { ProfileComponent } from './global/profile/profile.component';
import { NavigationComponent } from './global/navigation/navigation.component';
import { MainChatComponent } from './main/main-chat/main-chat/main-chat.component';
import { SidebarLeftComponent } from './main/sidebar-left/sidebar-left/sidebar-left.component';
import { ThreadRightComponent } from './main/thread-right/thread-right.component';
import { TextfieldComponent } from './main/main-chat/textfield/textfield.component';
import { MessageWrapperComponent } from './chat/chat-message/message-wrapper/message-wrapper.component';
import { ImprintComponent } from './others/imprint/imprint.component';
import { LegalNoticeComponent } from './others/legal-notice/legal-notice.component';
import { AddChannelComponent } from './main/sidebar-left/add-channel/add-channel.component';
import { EditChannelComponent } from './chat/edit-channel/edit-channel.component';
import { ShowMembersComponent } from './main/sidebar-left/show-members/show-members.component';
import { AddChatMembersComponent } from './chat/chat-persons/add-chat-members/add-chat-members.component';
import { EditMessageComponent } from './chat/chat-message/edit-message/edit-message.component';
import { CheckInComponent } from './checkin/check-in/check-in.component';
import { ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CheckInSiteServiceService } from './services/generally/check-in-site-service.service';
import { ChatSiteComponent } from './main/chat-site/chat-site.component';
import { ChannelAreaComponent } from './main/sidebar-left/channel-area/channel-area.component';
import { ChatDateComponent } from './chat/chat-message/chat-date/chat-date.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { MessageWindowComponent } from './main/main-chat/message-window/message-window.component';
import { ChatMembersComponent } from './chat/chat-persons/chat-members/chat-members.component';
import { AddContactComponent } from './chat/chat-persons/add-contact/add-contact.component';

@NgModule({
  declarations: [
    AppComponent,
    AnimationComponent,
    SignInComponent,
    LogInComponent,
    ChooseAvatarComponent,
    ResetEmailComponent,
    ResetPasswordComponent,
    MainComponent,
    HeaderComponent,
    SearchComponent,
    ProfileComponent,
    NavigationComponent,
    MainChatComponent,
    SidebarLeftComponent,
    ThreadRightComponent,
    TextfieldComponent,
    MessageWrapperComponent,
    ImprintComponent,
    LegalNoticeComponent,
    AddChannelComponent,
    EditChannelComponent,
    ShowMembersComponent,
    AddChatMembersComponent,
    EditMessageComponent,
    CheckInComponent,
    ChatSiteComponent,
    ChannelAreaComponent,
    ChatDateComponent,
    MessageWindowComponent,
    ChatMembersComponent,
    AddContactComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    
  ],
  providers: [
    CheckInSiteServiceService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
