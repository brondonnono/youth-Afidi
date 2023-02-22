import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirestorageService {
  constructor(private afSG: AngularFireStorage) {}

  upload(file: string, fileName: string, folderRef: string) {
    return this.afSG
      .ref(`/${folderRef}/${fileName}`)
      .putString(file, 'data_url');
  }

  getImageUrl(fileName: string, folderRef: string): Observable<any> {
    return this.afSG.ref(`/${folderRef}/${fileName}`).getDownloadURL();
  }
}
