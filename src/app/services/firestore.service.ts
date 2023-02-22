import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private firestore: AngularFirestore) {}

  getDocs(collectionRef: string) {
    return this.firestore.collection(collectionRef).valueChanges();
  }

  createDoc(collectionRef: string, docObject: any, docId?: any) {
    let result: any;
    if (!docId)
      result = this.firestore.collection(collectionRef).add(docObject);
    else
      result = this.firestore.doc(`${collectionRef}/${docId}`).set(docObject);
    return result;
  }

  getDoc(collectionRef: string, docRef: string) {
    return this.firestore.collection(collectionRef).doc(docRef);
  }

  deleteDoc(collectionRef: string, docId: any) {
    return this.firestore.doc(`${collectionRef}/${docId}`).delete();
  }

  updateDoc(
    collectionRef: string,
    docId: any,
    docObject: any,
    updateNature?: 'all' | 'partial'
  ) {
    if (updateNature && updateNature === 'partial')
      return this.firestore.doc(`${collectionRef}/${docId}`).update(docObject);
    else
      return this.firestore.doc(`${collectionRef}/${docId}`).set(docObject);
  }
}
