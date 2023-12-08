import { Injectable } from '@angular/core';
import { initializeApp } from '@angular/fire/app';
import { Storage, getStorage, ref, uploadBytesResumable } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FireStorageService {



  constructor(
    private storage: Storage 
  ) { 

    this.storage = getStorage();
  }

  firebaseApp = initializeApp(environment.firebase);


  uploadFile(image: File) {
    console.log(image);
    
    const storageRef = ref(this.storage, image.name);
    uploadBytesResumable(storageRef, image);
  }

}


