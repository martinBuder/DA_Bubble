import { Injectable} from '@angular/core';
import { Firestore, addDoc, doc, onSnapshot, query, setDoc, updateDoc } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class FireDatabaseService {

  fireCollection !: any;  

  constructor(
    private firestore: Firestore,
  ) { }

    /**
     * get List from Firebase
     * 
     * @param fireCollection, that we use
     * @param projectArray, that we need for *ngFor 
     */   
    getListFromFirebase(fireCollection: any, projectArray: any) {      
      onSnapshot(query(fireCollection),
      (querySnapshot) => {
        // projectArray = [];
        querySnapshot.forEach((doc) => {
          const itemJson: any = doc.data();
          itemJson['id'] = doc.id;          
          projectArray.push(itemJson);     
        });   
    
      });
    }

     /**
     * get List from Firebase with an query
     * 
     * @param fireCollection, that we use
     * @param projectArray, that we need for *ngFor 
     */   
     getQueryListFromFirebase(fireCollection: any, fireQuery: any, projectArray: Array<any>) {
      onSnapshot(query(fireCollection,fireQuery),
      (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const itemJson: any = doc.data();
          itemJson['id'] = doc.id;
          projectArray.push(itemJson);
        });   
 
          
      });
    }
   

    /**
     * set the item to the right item with the id
     * 
     * @param fireList 
     * @param fireListId 
     * @param item 
     */
    async setItemToFirebase(fireList: string, fireListId: any, item: any) {
      await setDoc(doc(this.firestore, fireList, fireListId), item)
    }

    async addItemToFirebase(fireList: any, item: any) {
      await addDoc(fireList, item ) 

    }

     /**
     * update the profile in firebase
     * 
     * @param id profile-id
     */
     async updateFireItem(fireCollection: any, id: string, item: any) {
      const itemRef = doc(fireCollection, id)
      await updateDoc(itemRef, item);
    }
}
