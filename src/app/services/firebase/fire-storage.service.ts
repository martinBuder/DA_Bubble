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
 
  fireImgUrl !: string;



  constructor( 
  ) { 
    this.storage = getStorage(this.firebaseApp)    
  }

  firebaseApp = initializeApp(environment.firebase);   


  

  async uploadFile(image: File, storageFireStringUrl: string) {    
    const storageFireRef = ref(this.storage, storageFireStringUrl);
    await uploadBytesResumable(storageFireRef, image);
    await getDownloadURL(ref(this.storage, storageFireStringUrl))
    .then((url) => {
    this.fireImgUrl = url;
    })
    .catch((error) => {
      // Handle any errors
    });
  } 



 
      
}







