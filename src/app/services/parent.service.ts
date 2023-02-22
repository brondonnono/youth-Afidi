import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireObject, AngularFireDatabase } from '@angular/fire/compat/database';
import { Parent } from '../models/parent';

@Injectable({
  providedIn: 'root'
})
export class ParentService {

  parentListRef: AngularFireList<any> = {} as AngularFireList<any>;
  parentRef: AngularFireObject<any> = {} as AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) {}

  // Create
  createParent(parent: Parent) {
    return this.parentListRef.push(parent);
  }

  // Get Single
  getParent(id: string) {
    this.parentRef = this.db.object('/parent/' + id);
    return this.parentRef;
  }

  // Get List
  getParentList() {
    this.parentListRef = this.db.list('/parent');
    return this.parentListRef;
  }

  // Update
  updateParent(id: string, parent: Parent) {
    return this.parentRef.update(parent);
  }

  // Delete
  deleteParent(id: string) {
    this.parentRef = this.db.object('/parent/' + id);
    this.parentRef.remove();
  }
}
