import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireObject, AngularFireDatabase } from '@angular/fire/compat/database';
import { Activity } from '../models/activity';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  activityListRef: AngularFireList<any> = {} as AngularFireList<any>;
  activityRef: AngularFireObject<any> = {} as AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) {}

  // Create
  createActivity(activity: Activity) {
    return this.activityListRef.push(activity);
  }

  // Get Single
  getActivity(id: string) {
    this.activityRef = this.db.object('/activity/' + id);
    return this.activityRef;
  }

  // Get List
  getActivityList() {
    this.activityListRef = this.db.list('/activity');
    return this.activityListRef;
  }

  // Update
  updateActivity(id: string, activity: Activity) {
    return this.activityRef.update(activity);
  }

  // Delete
  deleteActivity(id: string) {
    this.activityRef = this.db.object('/activity/' + id);
    this.activityRef.remove();
  }
}
