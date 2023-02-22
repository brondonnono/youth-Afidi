import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireObject, AngularFireDatabase } from '@angular/fire/compat/database';
import { addDoc, collection, Firestore, getFirestore } from 'firebase/firestore';
import { Person } from '../models/person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  personConverter = {
    toFirestore: (person: Person) => {
      return {
        personId: person.getPersonId,
        name: person.name,
        surname: person.surname,
        numTel: person.getNumTel,
        havePhone: person.getHavePhone,
        haveAccount: person.getHaveAccount,
        userId: person.getUserId,
        city: person.city,
        country: person.country,
        quater: person.quater
      };
    },
    fromFirestore: (snapshot: any, options: any) => {
      const data = snapshot.data(options);
      let newPerson = new Person(data.name, data.surname, data.country, data.city, data.quater);
      newPerson.setPersonId = data.personId;
      newPerson.setUserId = data.userId;
      newPerson.setHaveAccount = data.haveAccount;
      newPerson.setHavePhone = data.havePhone;
      newPerson.setNumTel = data.setNumtel;
      return newPerson;
    }
  };
  private firestore: Firestore;
  personListRef: AngularFireList<any> = {} as AngularFireList<any>;
  personRef: AngularFireObject<any> = {} as AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) { 
    this.firestore = getFirestore();
  }

  // Create
  async createPerson(person: Person) {
    console.log('person to create => => ', person);
    const ref = collection(this.firestore, "person").withConverter(this.personConverter);
    const docRef = await addDoc(ref, person);
    return docRef.id;
  }

  // Get Single
  getPerson(id: string) {
    this.personRef = this.db.object('/person/' + id);
    return this.personRef;
  }

  // Get List
  getPersonList() {
    this.personListRef = this.db.list('/person');
    return this.personListRef;
  }

  // Update
  updatePerson(id: string, person: Person) {
    return this.personRef.update(person);
  }

  // Delete
  deletePerson(id: string) {
    this.personRef = this.db.object('/person/' + id);
    this.personRef.remove();
  }
}
