import { Injectable} from '@angular/core';
import { Firestore, addDoc, collection, deleteDoc, doc, onSnapshot, query, setDoc, updateDoc } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class FireDatabaseService {

  // *Arrays for firebaseFill
  [key: string]: any; // ~ this we need to make from a string a variable name

  userChannels : any = [ ];
  channelMessages: any = [];
  threadMessages: any = [];
  allAppUsers : Array<any> = [];
  contactChats: Array<any> = [];



 
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
    getListFromFirebase(fireCollection: any, fireArray: string) {      
      onSnapshot(query(fireCollection),
      (querySnapshot) => {
        let projectArray: any = [];
        querySnapshot.forEach((doc) => {
          const itemJson: any = doc.data();
          itemJson['id'] = doc.id;          
          projectArray.push(itemJson);    
          this[fireArray] = projectArray
        });   
      });
    }

     /**
     * get List from Firebase with an query
     * 
     * @param fireCollection, that we use
     * @param projectArray, that we need for *ngFor 
     */   
    async getQueryListFromFirebase(fireCollection: any, fireQuery: any, fireArray: string) {
      onSnapshot(query(fireCollection,fireQuery),
      (querySnapshot) => { 
        let projectArray: any = []
        querySnapshot.forEach((doc) => {
          const itemJson: any = doc.data();
          itemJson['id'] = doc.id;
          projectArray.push(itemJson);
          this[fireArray] = projectArray
        }); 

        console.log(projectArray);
                
        
      })
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

     /**
   * delete User from firebase
   * 
   * @param id 
   */
  deleteUser(fireList:any, id:string) {
    let fireCollection = collection(this.firestore, fireList);
    let userDoc = doc(fireCollection, id)
    deleteDoc(userDoc);
  }
}
