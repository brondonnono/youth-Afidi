import { Injectable } from '@angular/core';
import { Person } from '../models/person';
import { User } from '../models/user';
import { AngularFireList, AngularFireObject, AngularFireDatabase } from '@angular/fire/compat/database';
import { doc, setDoc, getFirestore, getDoc, getDocs, collection } from '@angular/fire/firestore';
import { Firestore, query, where } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  userConverter = {
    toFirestore: (user: User) => {
      return {
        userId: user.getUserId,
        email: user.email,
        language: user.language,
        type: user.getType,
        img: user.img,
      };
    },
    fromFirestore: (snapshot: any, options: any) => {
      const data = snapshot.data(options);
      let newUser = new User(data.email, data.language, data.img);
      newUser.setUserId = data.userId;
      newUser.setType = data.type;
      return newUser;
    }
  };

  userData = {} as User;
  personData = {} as Person;

  userDataClean = {} as User;

  language: string = 'fr';

  Cpassword: string = '';

  firestore: Firestore;
  userListRef: AngularFireList<any> = {} as AngularFireList<any>;
  userRef: AngularFireObject<any> = {} as AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) {
    this.setDefaultValue();
    this.firestore = getFirestore();
  }

  // Create
  createUser(user: User) {
    return this.userListRef.push(user);
  }

  async testCreate(user: User) {
    const ref = doc(this.firestore, "user", user.getUserId).withConverter(this.userConverter);
    await setDoc(ref, user);
  }


  async testGet(user: User) {
    const ref = doc(this.firestore, "user", user.getUserId).withConverter(this.userConverter);
    const docSnap = await getDoc(ref);
    if (docSnap.exists()) {
      const userData = docSnap.data();
      console.log(userData);
    } else {
      console.log("No such document!");
    }
  }

  async getAllUsers() {
    let users: User[] = [];
    const querySnapshot = await getDocs(collection(this.firestore, "user"));
    querySnapshot.forEach((doc) => {
      const user = this.initUserFromDoc(doc.data());
      users.push(user);
      console.log(doc.id, " => ", doc.data());
    });
    return users;
  }

  async getAllAdmin() {
    let admins: User[] = [];
    const q = query(collection(this.firestore, "user"), where("type", "!=", "client"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const admin = this.initUserFromDoc(doc.data());
      admins.push(admin);
      console.log(doc.id, " => ", doc.data());
    });
    return admins;
  }

  initUserFromDoc(doc: any) {
    let newUser = new User(doc.email, doc.language, doc.img);
    newUser.setUserId = doc.userId;
    newUser.setType = doc.type;
    return newUser;
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
