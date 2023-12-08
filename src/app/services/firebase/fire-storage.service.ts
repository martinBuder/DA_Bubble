import { LocalizedString } from '@angular/compiler';
import { Injectable, inject } from '@angular/core';
import { FirebaseApp, initializeApp } from '@angular/fire/app';
import { Storage, StorageError, getStorage, ref, uploadBytesResumable } from '@angular/fire/storage';
import { StorageErrorCode } from 'firebase/storage';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FireStorageService {

  firebaseApp !: FirebaseApp;
  storage !: any;

 
  constructor( 
  ) { 
  }

  


  getFireStorage(): Promise<any> {
    return new Promise((resolve, reject) => {
    this.firebaseApp = initializeApp(environment.firebase);
    this.storage = getStorage(this.firebaseApp, 'gs://mb-dabubble-1985.appspot.com');
       
    console.log('here is all fine');
    })
  }

  uploadFile(image: File) {
    this.getFireStorage().then(() => {
    
    try {
      console.log(this.storage);
      
      const storageFireRef = ref(this.storage);
      console.log(storageFireRef);
      
      console.log(image);
      
      uploadBytesResumable(storageFireRef, image);
      console.log('here is all fine');
    }
    catch(error: any) {
        switch (error.code) {
          case 'UNAUTHENTICATED':
            console.error('Unauthentifiziert:', error.message);
            // Hier weitere spezifische Aktionen für diesen Authentifizierungsfehler ausführen
            break;
          case 'UNAUTHORIZED':
            console.error('Unberechtigt:', error.message);
            // Hier weitere spezifische Aktionen für diesen Autorisierungsfehler ausführen
            break;
          // ... andere Fälle behandeln
          default:
            console.error('Unbehandelter Fehler:', error.message);
        }
    
        // Zugriff auf Firebase-spezifische Informationen
        if (error.customData) {
          console.error('Firebase-spezifische Daten:', error.customData);
        }
      } 
      
      }


  )}

}


