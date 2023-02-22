import { Person } from './../../../models/person';
import { PersonService } from './../../../services/person.service';
import { User } from './../../../models/user';
import { TranslationService } from './../../../services/translation.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { StorageService } from 'src/app/services/storage.service';
import { UtilService } from 'src/app/services/util.service';
import { UserService } from 'src/app/services/user.service';
import { RegisterValidator } from './registerFormsValidators';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage extends RegisterValidator implements OnInit {

  isVisible: boolean = false;
  isLoading: boolean = false;
  isErrors: boolean = false;

  public translate: any = {};

  constructor(
    protected fb: FormBuilder,
    private authService: AuthService,
    public menu: MenuController,
    private storageService: StorageService,
    public translationService: TranslationService,
    private utilService: UtilService,
    private personService: PersonService,
    protected override userService: UserService,
    public navigationService: NavigationService,
  ) {
    super(fb, userService);
  }

  public ionViewWillEnter(): void {
    this.translate = this.translationService.getTranslation(this.userService.language);
    this.menu.enable(false);
  }

  public ionViewWillLeave(): void {
    this.menu.enable(true);
  }

  ngOnInit() {
    this.translate = this.translationService.getTranslation(this.userService.language);
  }

  public changeLanguage(event: any): void {
    this.userService.language = event.detail.value;
    this.userService.userData.language = event.detail.value;
    this.translate = this.translationService.getTranslation(this.userService.language);
    console.log(this.userService.language);
  }

  // getUserLocalLanguage(): string {
  //   let lang: string = '';
  //   this.storageService.getLanguage().then(
  //     (res: string) => {
  //       lang = res;
  //     },
  //     // err => this.utilService.showToast(this.translate.error.defaultMsg, 'warning')
  //     err => {
  //       console.log(err);
  //       lang = 'fr';
  //     }
  //   )
  //     .catch(rejected => console.log(rejected));
  //   return lang;
  // }

  // async register() {
  //   let errMsg = { title: '', msg: '' };
  //   await this.utilService.showLoader(this.translate.util.loading);
  //   const loginData = { email: this.registerEmail?.value, password: this.registerPassword?.value };
  //   await this.authService.register(loginData).then((userCredential) => {
  //     const user = userCredential.user;
  //     let userData = new User(loginData.email as string, this.registerLang?.value as string);
  //     userData.setUserId = user.uid;
  //     this.userService.createUser(userData).then(res => {
  //       let person = new Person(this.registerName?.value as string, this.registerSurname?.value as string);
  //       person.setUserId = userData.getUserId;
  //       person.setPersonId = userData.getUserId;
  //       person.setHaveAccount = true;
  //       person.setHavePhone = this.registerTel?.valid as boolean;
  //       if (person.getHavePhone) person.setNumTel = this.registerTel?.value as string;
  //       this.personService.createPerson(person).then(result => {
  //         this.registerForm.reset();
  //       })
  //         .catch(error => console.log(error));
  //     })
  //       .catch(error => console.log(error));
  //     this.utilService.showToast('Opération réussie', 'success');
  //     this.navigationService.goto('/login');
  //   })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       console.log(error);
  //       const errorMessage = error.message;
  //       this.utilService.showAlert('Erreur', 'Une erreur est survenue, Vérifiez votre connexion internet puis réésayez!');
  //     });
  //   await this.utilService.dismiss();
  // }

  async register() {
    let loginData = { email: this.registerEmail?.value, password: this.registerPassword?.value };
    console.log(loginData);
    this.authService.register(loginData).then(res => {
      const user = res.user;
      // if(!user || user == undefined) {
      //   this.utilService.showAlert('Erreur', 'Une erreur est survenue, Vérifiez votre connexion internet puis réésayez!');
      //   return;
      // }
      console.log(user.uid);
      let userData = new User(loginData.email as string, this.registerLang?.value as string);
      userData.setUserId = user.uid;
      console.log(userData);
      this.userService.createUser(userData).then(res => {
        let localUser = {
          uid: userData.getUserId,
          email: userData.email,
          type: userData.getType,
          language: userData.language,
          userRef: res
        };
        this.storageService.setObject('userData', localUser);
      })
      this.userService.getAllUsers();
      // this.userService.createUser(userData).then(res => {
      //   let person = new Person(this.registerName?.value as string, this.registerSurname?.value as string);
      //   person.setUserId = userData.getUserId;
      //   person.setPersonId = userData.getUserId;
      //   person.setHaveAccount = true;
      //   person.setHavePhone = this.registerTel?.valid as boolean;
      //   if (person.getHavePhone) person.setNumTel = this.registerTel?.value as string;
      //   this.personService.createPerson(person).then(result => {
      //     this.registerForm.reset();
      //   })
      //     .catch(error => console.log(error, 'create person'));
      // })
      //   .catch(error => console.log(error, 'create user'));
      this.utilService.showToast('Opération réussie', 'success');
      // this.navigationService.goto('/login');
    })
      .catch(error => console.log(error));
  }

  public getPasswordType() {
    return this.isVisible ? 'text' : 'password';
  }

  async changePasswordVisibility() {
    this.isVisible = !this.isVisible;
  }

}
