import { Injectable } from '@angular/core';
// import { Storage } from '@ionic/storage-angular';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() { // private storage: Storage,
    // this.initStorage();
  }

  async setData(key: string, value: string) {
    await Preferences.set({
      key: key,
      value: value,
    });
  }

  async deleteData(key: string) {
    await Preferences.remove({ key: key });
  }

  async getData(key: string) {
    const res = await Preferences.get({ key: key });
    return res.value;
  }

  async setObject(key: string, value: any) {
    await Preferences.set({
      key: key,
      value: JSON.stringify(value),
    });
  }

  async getObject(key: string) {
    const res = await Preferences.get({ key: key });
    return JSON.parse(res.value!);
  }

  // public async initStorage() {
  //   const _storage = await this.storage.create();
  //   this.storage = _storage;
  // }

  // public setLanguage(lang: string): Promise<boolean> {
  //   return this.storage.set('user_language', lang);
  // }

  // public getLanguage(): Promise<string> {
  //   return this.storage.get('user_language');
  // }

  // public setTheme(isDark: boolean): Promise<boolean> {
  //   return this.storage.set('user_theme', isDark);
  // }

  // public getTheme(): Promise<boolean> {
  //   return this.storage.get('user_theme');
  // }

  // public setTutorial(didTurial: boolean): Promise<boolean> {
  //   return this.storage.set('did_tutorial', didTurial);
  // }

  // public getTutorial(): Promise<boolean> {
  //   return this.storage.get('did_tutorial');
  // }
}
