import { Component } from '@angular/core';
import { initializeApp } from '@angular/fire/app';
import ChatMessageService from 'src/app/services/chatDatas/chat-message.service';
import { FireStorageService } from 'src/app/services/firebase/fire-storage.service';
import { OpenCloseService } from 'src/app/services/generally/open-close.service';
import { CreateAccountService } from 'src/app/services/userDatas/create-account.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})

  export class ImageUploadComponent {
 
    selectedFiles?: FileList;
    currentFile?: File;
    progress = 0;
    errorMessage :string = '';
    preview = '';
    storageFireStringUrl !: string;
    imgToken !: string;

   
    constructor(
      private fireStorageService: FireStorageService,
      public openCloseService: OpenCloseService,
      private createAccountService : CreateAccountService,
      private chatMessageService: ChatMessageService,

      ) {}
 
    /**
   * generate a random token 
   * 
   * @param length of token
   * @returns token
   */
    generateRandomToken(length: number) {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let token = '';
      for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          token += characters.charAt(randomIndex);
      }
      return token;
    }

    async uploadProfileImg() {
      this.imgToken = this.generateRandomToken(32);
      this.storageFireStringUrl = `gs://mb-dabubble-1985.appspot.com/avatarUpload/${ this.imgToken }`
      await this.upload();
      this.createAccountService.profileImg = this.fireStorageService.fireImgUrl;
      this.closeImgUpload();
    }

    async uploadMessageImg() {
      this.imgToken = this.generateRandomToken(32);
      this.storageFireStringUrl = `gs://mb-dabubble-1985.appspot.com/avatarUpload/${ this.imgToken }`
      await this.upload();
      this.chatMessageService.isThisAnImage = true;
      this.chatMessageService.messageText = this.fireStorageService.fireImgUrl;
      await this.chatMessageService.sendMessage(this.openCloseService.chatOrThread);
      this.closeImgUpload()
    }

    closeImgUpload() {
      this.openCloseService.imgUploadOpen = false;
      this.currentFile = undefined;
      this.selectedFiles = undefined;
    }
  
  async upload() {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.currentFile = file;
        await this.fireStorageService.uploadFile(this.currentFile, this.storageFireStringUrl);
      }
    }
  }

  selectFile(event: any): void {
    this.errorMessage = '';
    this.preview = '';
    this.progress = 0;
    this.selectedFiles = event.target.files;
  
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
  
      if (file) {
        this.preview = '';
        this.currentFile = file;
        const reader = new FileReader();
          reader.onload = (e: any) => {
          console.log(e.target.result);
          this.preview = e.target.result;
        };
          reader.readAsDataURL(this.currentFile);
      }
    }
  }

  uploadTextImage() {
    

  }
}
