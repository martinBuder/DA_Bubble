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
    uploading : boolean = false;

   
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

    /**
     * set datas for fire storage
     */
    setFireStorageDatas() {
      this.imgToken = this.generateRandomToken(32);
      this.storageFireStringUrl = `gs://mb-dabubble-1985.appspot.com/avatarUpload/${ this.imgToken }`
    }

    /**
     * upload img as profil img
     */
    async uploadProfileImg() {
      this.setFireStorageDatas();
      await this.upload();
      this.createAccountService.profileImg = this.fireStorageService.fireImgUrl;
      this.closeImgUpload();
    }

    /**
     * upload img as message
     */
    async uploadMessageImg() {
      this.uploading = true;
      this.setFireStorageDatas();
      await this.upload();
      this.sendDatasToChatMessageService();
      await this.chatMessageService.sendMessage(this.openCloseService.chatOrThread);
      this.closeImgUpload()
      this.uploading = false;
    }

    /**
     * set chat message datas for image
     */
    sendDatasToChatMessageService() {
      this.chatMessageService.isThisAnImage = true;
      this.chatMessageService.storageUrl = this.storageFireStringUrl;
      this.chatMessageService.messageText = this.fireStorageService.fireImgUrl;
    }

    /**
     * close the uploader
     */
    closeImgUpload() {
      this.openCloseService.imgUploadOpen = false;
      this.currentFile = undefined;
      this.selectedFiles = undefined;
      this.openCloseService.imgUploadOpen = false;
      this.openCloseService.openImage = false;
    }
  
   /**
    * set datas for firestorage upload service 
    */
  async upload() {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.currentFile = file;
        await this.fireStorageService.uploadFile(this.currentFile, this.storageFireStringUrl);
      }
    }
  }

  /**
   * select a img
   * 
   * @param event 
   */
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
