import { Injectable } from '@angular/core';
import { FirebaseApp, initializeApp } from '@angular/fire/app';
import { Storage, getStorage, ref, uploadBytesResumable } from '@angular/fire/storage';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FireStorageService {

  public storage !: Storage;


  constructor( 
  ) { 
  }

  firebaseApp = initializeApp(environment.firebase);   


  
  
  uploadFile(image: File) {    
    this.storage = getStorage(this.firebaseApp)
    console.log(`next step`);
    
    const storageFireRef = ref(this.storage);
    uploadBytesResumable(storageFireRef, image);
  } 
      
}







