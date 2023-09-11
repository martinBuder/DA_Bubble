import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { AnimationComponent } from './checkin/animation/animation.component';
import { SignInComponent } from './checkin/sign-in/sign-in.component';
import { LogInComponent } from './checkin/log-in/log-in.component';
import { ChooseAvatarComponent } from './checkin/choose-avatar/choose-avatar.component';
import { ResetEmailComponent } from './checkin/reset-email/reset-email.component';
import { ResetPasswordComponent } from './checkin/reset-password/reset-password.component';
import { MainComponent } from './global/main/main.component';
import { HeaderComponent } from './global/header/header.component';
import { LogoComponent } from './global/logo/logo.component';
import { SearchComponent } from './global/search/search.component';
import { ProfileComponent } from './global/profile/profile.component';
import { NavigationComponent } from './global/navigation/navigation.component';
import { MainChatComponent } from './main/main-chat/main-chat.component';
import { SidebarLeftComponent } from './main/sidebar-left/sidebar-left.component';
import { ThreadRightComponent } from './main/thread-right/thread-right.component';
import { TextfieldComponent } from './chat/textfield/textfield.component';
import { MessageWrapperComponent } from './chat/message-wrapper/message-wrapper.component';
import { ImprintComponent } from './others/imprint/imprint.component';
import { LegalNoticeComponent } from './others/legal-notice/legal-notice.component';
import { ProfileViewComponent } from './others/profile-view/profile-view.component';
import { AddChannelComponent } from './chat/add-channel/add-channel.component';
import { EditChannelComponent } from './chat/edit-channel/edit-channel.component';
import { ShowMembersComponent } from './chat/show-members/show-members.component';
import { AddMembersComponent } from './chat/add-members/add-members.component';
import { EditMessageComponent } from './chat/edit-message/edit-message.component';
import { CheckInComponent } from './checkin/check-in/check-in.component';
import { ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { CheckInSiteServiceService } from './services/check-in-site-service.service';

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
    LogoComponent,
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
    ProfileViewComponent,
    AddChannelComponent,
    EditChannelComponent,
    ShowMembersComponent,
    AddMembersComponent,
    EditMessageComponent,
    CheckInComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatIconModule,
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
export class AppModule { }
