import { Injectable } from '@angular/core';
import { FirebaseApp, initializeApp } from '@angular/fire/app';
import { Storage, getDownloadURL, getStorage, ref, uploadBytesResumable } from '@angular/fire/storage';

import { environment } from 'src/environments/environment';
import { CreateAccountService } from '../userDatas/create-account.service';

@Injectable({
  providedIn: 'root',
})
export class FireStorageService {

  public storage !: Storage;
  userImgToken !: string;
  fireImgUrl !: string;

  fireStorageToken : string = 'dfbb7cfe-dafd-4bf5-995e-4e8fbc73cf7c'

  constructor( 
    private createAccountService : CreateAccountService,
  ) { 
    this.storage = getStorage(this.firebaseApp)    
  }

  firebaseApp = initializeApp(environment.firebase);   

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
  

  async uploadFile(image: File) {    
    this.userImgToken = this.generateRandomToken(32);
    const storageFireStringUrl = `gs://mb-dabubble-1985.appspot.com/avatarUpload/${ this.userImgToken }`
    const storageFireRef = ref(this.storage, storageFireStringUrl);
    await uploadBytesResumable(storageFireRef, image);

    await getDownloadURL(ref(this.storage, storageFireStringUrl))
    .then((url) => {
    
      this.createAccountService.profileImg = url
     console.log(url);
     
    })
    .catch((error) => {
      // Handle any errors
    });
  } 

  generateFireImgUrl() {
    this.fireImgUrl = 'test';
  }

 
      
}







