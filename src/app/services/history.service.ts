import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireObject, AngularFireDatabase } from '@angular/fire/compat/database';
import { History } from '../models/history';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  historyListRef: AngularFireList<any> = {} as AngularFireList<any>;
  historyRef: AngularFireObject<any> = {} as AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) {}
  History
  // Create
  createHistory(history: History) {
    return this.historyListRef.push(history);
  }

  // Get Single
  getHistory(id: string) {
    this.historyRef = this.db.object('/history/' + id);
    return this.historyRef;
  }

  // Get List
  getHistoryList() {
    this.historyListRef = this.db.list('/history');
    return this.historyListRef;
  }

  // Update
  updateHistory(id: string, history: History) {
    return this.historyRef.update(history);
  }

  // Delete
  deleteHistory(id: string) {
    this.historyRef = this.db.object('/history/' + id);
    this.historyRef.remove();
  }
}
