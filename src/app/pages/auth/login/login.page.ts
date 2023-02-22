import { StorageService } from 'src/app/services/storage.service';
import { UserService } from './../../../services/user.service';
import { TranslationService } from './../../../services/translation.service';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UtilService } from 'src/app/services/util.service';
import { LoginValidator } from './loginFormsValidators';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage extends LoginValidator implements OnInit {
  isVisible: boolean = false;
  public translate: any = {};

  constructor(
    public formbuilder: FormBuilder,
    public authservice: AuthService,
    public utilService: UtilService,
    private userService: UserService,
    private storageService: StorageService,
    private navigationService: NavigationService,
    public menu: MenuController,
    private translationService: TranslationService,
    // private firestore: AngularFirestore,
    private nav: NavController
  ) {
    super(formbuilder);
  }

  public ionViewWillEnter(): void {
    this.translate = this.translationService.getTranslation(this.userService.language);
    this.menu.enable(false);
  }

  public ionViewWillLeave(): void {
    this.menu.enable(true);
    this.translate = this.translationService.getTranslation('fr');
  }

  ngOnInit() {
    this.translate = this.translationService.getTranslation(this.userService.language);
  }

  // async login() {
  //   await this.utilService.showLoader(this.translate.util.loading);
  //   console.log('Am logged in', this.loginForm.value);
  //   try {
  //     // this.userService.userData.email = this.email?.value;
  //     // this.userService.userData.setPassword = this.password?.value;
  //     if (this.userService.userData.email === 'admin@admin.cm')
  //       this.userService.userData.setType = 'admin';
  //     await this.utilService.dismiss();
  //     //  this.authservice.loginFireauth(value).then( resp =>{
  //     //    console.log(resp);
  //     //  this.router.navigate(['tabs'])

  //     //  if(resp.user){

  //     //    this.authservice.setUser({
  //     //      username : resp.user.displayName,
  //     //      uid: resp.user.uid
  //     //    })

  //     //   const userProfile = this.firestore.collection('profile').doc(resp.user.uid);

  //     //    userProfile.get().subscribe( result=>{

  //     //     if(result.exists){
  //     //       this.nav.navigateForward(['tabs']);
  //     //     }else{

  //     //       this.firestore.doc(`profile/${this.authservice.getUID()}`).set({
  //     //         name: resp.user.displayName,
  //     //         email: resp.user.email
  //     //       });

  //     //        this.nav.navigateForward(['uploadimage']);
  //     //     }
  //     //    })
  //     //  }
  //     // let userData: User = new User(
  //     //   this.email?.value,
  //     //   'fr',
  //     //   this.password?.value
  //     // );
  //     this.authservice.login(this.loginForm.value);
  //     //  })
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  redirecto(user: User) {
    if (user.email === 'mac@mac.cm') this.navigationService.goto('/tabAdmin');
    // if (user.getType === 'admin') this.navigationService.goto('/tabAdmin');
    else this.navigationService.goto('/home');
  }

  async login() {
    await this.utilService.showLoader(this.translate.util.loading);
    console.log('Am logged in', this.loginForm.value);
    try {
      const credentials = {
        email: this.loginEmail?.value as string,
        password: this.loginPassword?.value as string
      };
      this.loginPassword?.reset();
      await this.utilService.dismiss();
      this.authservice.login(credentials).then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        this.userService.getUser(user.uid).valueChanges().subscribe(res => {
          // save userData to localStorage
          this.storageService.setObject('userData', {
            email: user.email,
            uid: user.uid,
            type: res.type,
            lang: res.language
          });
          this.storageService.deleteData('user_language');
          this.storageService.setData('user_language', res.language);
          this.storageService.deleteData('isConnected');
          this.utilService.showToast('Connexion réussie', 'success');
          this.storageService.setData('isConnected', 'true');
          this.redirecto(res);
        });
      }).catch((error) => {
        this.loginForm.reset();
        this.utilService.showToast('Echec de connexion', 'danger');
        const errorCode = error.code;
        const errorMessage = error.message;
      });
      await this.utilService.dismiss();
    } catch (error) {
      this.loginForm.reset();
      this.utilService.showToast('Echec de connexion', 'danger');
      await this.utilService.dismiss();
      console.log(error);
    }
  }
  public getPasswordType() {
    return this.isVisible ? 'text' : 'password';
  }

  async changePasswordVisibility() {
    this.isVisible = !this.isVisible;
  }
}
