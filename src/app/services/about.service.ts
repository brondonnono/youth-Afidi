import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireObject, AngularFireDatabase } from '@angular/fire/compat/database';
import { About } from '../models/about';

@Injectable({
  providedIn: 'root'
})
export class AboutService {

  aboutListRef: AngularFireList<any> = {} as AngularFireList<any>;
  aboutRef: AngularFireObject<any> = {} as AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) {}

  // Create
  createAbout(about: About) {
    return this.aboutListRef.push(about);
  }

  // Get Single
  getAbout(id: string) {
    this.aboutRef = this.db.object('/about/' + id);
    return this.aboutRef;
  }

  // Get List
  getAboutList() {
    this.aboutListRef = this.db.list('/about');
    return this.aboutListRef;
  }

  // Update
  updateAbout(id: string, about: About) {
    return this.aboutRef.update(about);
  }

  // Delete
  deleteAbout(id: string) {
    this.aboutRef = this.db.object('/about/' + id);
    this.aboutRef.remove();
  }
}
