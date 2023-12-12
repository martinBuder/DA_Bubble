import { Injectable } from '@angular/core';
import { FirebaseApp, initializeApp } from '@angular/fire/app';
import { Storage, getStorage, ref, uploadBytesResumable } from '@angular/fire/storage';

import { environment } from 'src/environments/environment';
import { FireAuthService } from './fire-auth.service';

@Injectable({
  providedIn: 'root',
})
export class FireStorageService {

  public storage !: Storage;


  constructor( 
  ) { 
  }

  firebaseApp = initializeApp(environment.firebase);   


  generateRandomToken(length: number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        token += characters.charAt(randomIndex);
    }
    return token;
}
  
  uploadFile(image: File) {    
    const userImgToken = this.generateRandomToken(32);
    this.storage = getStorage(this.firebaseApp)
    console.log(`next step`);
    
    const storageFireRef = ref(this.storage, `gs://mb-dabubble-1985.appspot.com/avatarUpload/${ userImgToken }`);
    uploadBytesResumable(storageFireRef, image);
  } 
      
}







