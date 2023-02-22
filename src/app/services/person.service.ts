import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireObject, AngularFireDatabase } from '@angular/fire/compat/database';
import { addDoc, collection, doc, Firestore, getDoc, getDocs, getFirestore, query, where } from 'firebase/firestore';
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
        userId: person.getPersonId,
        city: person.city,
        country: person.country,
        quater: person.quater
      };
    },
    fromFirestore: (snapshot: any, options: any) => {
      const data = snapshot.data(options);
      let newPerson = new Person(data.name, data.surname, data.country, data.city, data.quater);
      newPerson.setPersonId = data.personId;
      newPerson.setPersonId = data.personId;
      newPerson.setHaveAccount = data.haveAccount;
      newPerson.setHavePhone = data.havePhone;
      newPerson.setNumTel = data.setNumtel;
      return newPerson;
    }
  };

  personDocRef = 'null';
  public personData: Person = new Person('', '');
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
  async getPerson(id: string) {
    const ref = doc(this.firestore, "person", id).withConverter(this.personConverter);
    const docSnap = await getDoc(ref);
    if (docSnap.exists()) {
      const person = docSnap.data();
      this.personData = person;
      console.log(this.personData);
    } else {
      this.getPersonByUserId(id).then(res => {
        if (res.personData.name != '') {
          this.personData = res.personData;
          this.personDocRef = res.personDocRef;
        }
      });
    }
    return this.personData;
  }

  async getPersonByUserId(userId: string) {
    let person = { personData: new Person('', ''), personDocRef: '' };
    const q = query(collection(this.firestore, "person"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size == 0)
      return person;
    else {
      querySnapshot.forEach((doc) => {
        person.personData = this.initPersonFromDoc(doc.data());
        person.personDocRef = doc.id;
      });
      return person;
    }
  }

  // Get List
  async getPersonList() {
    let persons: Person[] = [];
    let i = 0;
    const querySnapshot = await getDocs(collection(this.firestore, "person"));
    console.log(querySnapshot.size, ' documents found(s)');
    querySnapshot.forEach((doc) => {
      const person = this.initPersonFromDoc(doc.data());
      persons.push(person);
      console.log("person ", i + 1, ' ', doc.id, " => ", doc.data());
      i++;
    });
    console.log('nbPersons = ', i);
    return persons;
  }

  initPersonFromDoc(doc: any) {
    let newPerson = new Person(doc.name, doc.surname, doc.country, doc.city, doc.quater);
    newPerson.setPersonId = doc.personId;
    newPerson.setHaveAccount = doc.haveAccount;
    newPerson.setNumTel = doc.numTel;
    newPerson.setUserId = doc.userId;
    newPerson.setHavePhone = doc.havePhone;
    return newPerson;
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
