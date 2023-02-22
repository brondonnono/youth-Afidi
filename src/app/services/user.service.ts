import { Injectable } from '@angular/core';
import { Person } from '../models/person';
import { User } from '../models/user';
import { AngularFireList, AngularFireObject, AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userData = {} as User;
  personData = {} as Person;

  userDataClean = {} as User;

  language: string = 'fr';

  Cpassword: string = '';

  userListRef: AngularFireList<any> = {} as AngularFireList<any>;
  userRef: AngularFireObject<any> = {} as AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) {
    this.setDefaultValue();
  }

  // Create
  createUser(user: User) {
    return this.userListRef.push(user);
  }

  // Get Single
  getUser(id: string) {
    this.userRef = this.db.object('/user/' + id);
    return this.userRef;
  }

  // Get List
  getUserList() {
    this.userListRef = this.db.list('/user');
    return this.userListRef;
  }

  // Update
  updateUser(id: string, user: User) {
    return this.userRef.update(user);
  }

  // Delete
  deleteUser(id: string) {
    this.userRef = this.db.object('/user/' + id);
    this.userRef.remove();
  }

  // fonction de definition de la langue par defaut
  setDefaultValue() {
    this.userData = new User('', 'fr', 'https://firebasestorage.googleapis.com/v0/b/afidi-follow-child.appspot.com/o/img%2Fnoavatar.png?alt=media&token=d72f4918-be6d-4deb-882a-74a807c5975d');
    this.userDataClean = new User('', 'fr', 'https://firebasestorage.googleapis.com/v0/b/afidi-follow-child.appspot.com/o/img%2Fnoavatar.png?alt=media&token=d72f4918-be6d-4deb-882a-74a807c5975d');
    this.language = this.userData.language;
  }

  // fonction de suppression des donnees de l'utilisateur courant
  clean() {
    this.language = this.userData.language;
    this.userData = this.userDataClean;
    this.userData = new User(this.userDataClean.email, this.language, 'https://firebasestorage.googleapis.com/v0/b/afidi-follow-child.appspot.com/o/img%2Fnoavatar.png?alt=media&token=d72f4918-be6d-4deb-882a-74a807c5975d');
  }

  changeUserLanguage(lang: string) {
    this.userData.language = lang;
    this.language = lang;
  }

  // fonction qui permet de mettre a jour les donnees interne de l'utilisateur
  updateData(userNewData: User, personNewData: Person, id: string) {
    if (userNewData.img === '') userNewData.img = 'https://firebasestorage.googleapis.com/v0/b/afidi-follow-child.appspot.com/o/img%2Fnoavatar.png?alt=media&token=d72f4918-be6d-4deb-882a-74a807c5975d';
    if (id === this.userData.getUserId) {
      userNewData.setUserId = this.userData.getUserId;
      userNewData.language = this.userData.language;
      this.clean();
      this.userData.copyData(userNewData);
      this.personData.copyData(personNewData);
    }
  }
}
