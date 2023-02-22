import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireObject, AngularFireDatabase } from '@angular/fire/compat/database';
import { Person } from '../models/person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  personListRef: AngularFireList<any> = {} as AngularFireList<any>;
  personRef: AngularFireObject<any> = {} as AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) {}

  // Create
  createPerson(person: Person) {
    return this.personListRef.push(person);
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
