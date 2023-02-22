import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireObject, AngularFireDatabase } from '@angular/fire/compat/database';
import { Staff } from '../models/staff';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  staffListRef: AngularFireList<any> = {} as AngularFireList<any>;
  staffRef: AngularFireObject<any> = {} as AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) {}

  // Create
  createStaff(staff: Staff) {
    return this.staffListRef.push(staff);
  }

  // Get Single
  getStaff(id: string) {
    this.staffRef = this.db.object('/staff/' + id);
    return this.staffRef;
  }

  // Get List
  getStaffList() {
    this.staffListRef = this.db.list('/staff');
    return this.staffListRef;
  }

  // Update
  updateStaff(id: string, staff: Staff) {
    return this.staffRef.update(staff);
  }

  // Delete
  deleteStaff(id: string) {
    this.staffRef = this.db.object('/staff/' + id);
    this.staffRef.remove();
  }
}
