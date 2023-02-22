import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireObject, AngularFireDatabase } from '@angular/fire/compat/database';
import { Member } from '../models/member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  memberListRef: AngularFireList<any> = {} as AngularFireList<any>;
  memberRef: AngularFireObject<any> = {} as AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) {}

  // Create
  createMember(member: Member) {
    return this.memberListRef.push(member);
  }

  // Get Single
  getMember(id: string) {
    this.memberRef = this.db.object('/member/' + id);
    return this.memberRef;
  }

  // Get List
  getMemberList() {
    this.memberListRef = this.db.list('/member');
    return this.memberListRef;
  }

  // Update
  updateMember(id: string, member: Member) {
    return this.memberRef.update(member);
  }

  // Delete
  deleteMember(id: string) {
    this.memberRef = this.db.object('/member/' + id);
    this.memberRef.remove();
  }
}
