import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateEmail,
} from '@angular/fire/auth';

import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public authErrorsCodes = [
    {
      type: 'network',
      code: 'auth/network-request-failed',
    },
    {
      type: 'invalidEmail',
      code: 'auth/invalid-email',
    },
    {
      type: 'emailUsed',
      code: 'auth/email-already-in-use',
    },
    {
      type: 'passwordFormatError',
      code: 'auth/weak-password',
    },
  ];
  constructor(
    private auth: Auth,
    private router: Router,
    private afAuth: AngularFireAuth,
  ) { }

  async login(credentials: any) {
    try {
      const user = await signInWithEmailAndPassword(this.auth, credentials.email, credentials.password);
      return user;
    } catch (e: any) {
      return e.code;
    }
  }

  async register(credentials: any) {
    console.log(credentials.email);
    try {
      const user = await createUserWithEmailAndPassword(
        this.auth,
        credentials.email,
        credentials.password
      );
      return user;
    } catch (e: any) {
      return e.code;
    }
  }

  async updateEmail(newEmail: string) {
    return updateEmail(this.auth.currentUser!, newEmail);
  }

  logout() {
    return signOut(this.auth);
  }

  checkUserType() { }

  deleteUser() {
    return this.auth.currentUser!.delete();
  }

  async resetPasswordTel(email: string) {
    return sendPasswordResetEmail(this.auth, email);
  }

  isconnected() {
    this.isLoggedIn();
    return this.auth.currentUser !== null;
  }

  getUid() {
    if (this.auth.currentUser) return this.auth.currentUser.uid;
    return null;
  }

  isLoggedIn() {
    this.afAuth.authState.subscribe(auth => {
      if (!auth) {
        console.log('non connecté');
        // this.connected = false;
      } else {
        console.log('onnecté: ' + auth.uid);
        // this.connected = true;
      }
    });
  }

}
