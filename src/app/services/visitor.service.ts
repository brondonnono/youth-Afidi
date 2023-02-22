import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireObject, AngularFireDatabase } from '@angular/fire/compat/database';
import { Visitor } from '../models/visitor';

@Injectable({
  providedIn: 'root'
})
export class VisitorService {

  visitorListRef: AngularFireList<any> = {} as AngularFireList<any>;
  visitorRef: AngularFireObject<any> = {} as AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) {}

  // Create
  createVisitor(visitor: Visitor) {
    return this.visitorListRef.push(visitor);
  }

  // Get Single
  getVisitor(id: string) {
    this.visitorRef = this.db.object('/visitor/' + id);
    return this.visitorRef;
  }

  // Get List
  getVisitorList() {
    this.visitorListRef = this.db.list('/visitor');
    return this.visitorListRef;
  }

  // Update
  updateVisitor(id: string, visitor: Visitor) {
    return this.visitorRef.update(visitor);
  }

  // Delete
  deleteVisitor(id: string) {
    this.visitorRef = this.db.object('/visitor/' + id);
    this.visitorRef.remove();
  }
}
