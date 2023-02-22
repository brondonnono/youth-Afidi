import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

export class RegisterValidator {
  public constructor(
    protected formBuilder: FormBuilder,
    protected userService: UserService
  ) {}

  public errorMessages = {
    name: [
      {
        lang: 'fr',
        type: 'required',
        message: 'Ce champ est obligatoire',
      },
      {
        lang: 'fr',
        type: 'pattern',
        message: "Veuillez utiliser des lettres de l'alphabet français",
      },
      {
        lang: 'en',
        type: 'required',
        message: 'This field is required',
      },
      {
        lang: 'en',
        type: 'pattern',
        message: 'Please use letters of the french alphabet',
      },
    ],
    surname: [
      {
        lang: 'fr',
        type: 'required',
        message: 'Ce champ est obligatoire',
      },
      {
        lang: 'fr',
        type: 'pattern',
        message: "Veuillez utiliser des lettres de l'alphabet français",
      },
      {
        lang: 'en',
        type: 'required',
        message: 'This field is required',
      },
      {
        lang: 'en',
        type: 'pattern',
        message: 'Please use letters of the french alphabet',
      },
    ],
    email: [
      {
        lang: 'fr',
        type: 'required',
        message: "L'adresse email est obligatoire",
      },
      {
        lang: 'fr',
        type: 'pattern',
        message: "L'adresse email saisie est incorrecte",
      },
      {
        lang: 'en',
        type: 'required',
        message: 'The email address is required',
      },
      {
        lang: 'en',
        type: 'pattern',
        message: 'The email address is incorrect',
      },
    ],
    password: [
      {
        lang: 'fr',
        type: 'required',
        message: 'Le mot de passe est obligatoire',
      },
      {
        lang: 'fr',
        type: 'minlength',
        message: 'Le mot de passe doit avoir au minimum 8 caractères',
      },
      {
        lang: 'en',
        type: 'required',
        message: 'The password is required',
      },
      {
        lang: 'en',
        type: 'minlength',
        message: 'The password must have at least 8 characters',
      },
    ],
    tel: [
      {
        lang: 'fr',
        type: 'required',
        message: 'Le numéro de téléphone est obligatoire',
      },
      {
        lang: 'fr',
        type: 'minLength',
        message: 'Le numéro doit avoir au moins 9 chiffres',
      },
      {
        lang: 'fr',
        type: 'pattern',
        message: 'Le numéro doit être sous la forme 6********',
      },
      {
        lang: 'fr',
        type: 'maxLength',
        message: 'Le numéro doit avoir au maximum 9 chiffres',
      },
      {
        lang: 'en',
        type: 'required',
        message: 'The phone number is required',
      },
      {
        lang: 'en',
        type: 'minLength',
        message: 'The phone number must have at least 9 numbers',
      },
      {
        lang: 'en',
        type: 'pattern',
        message: 'The phone number must be on format 6********',
      },
      {
        lang: 'en',
        type: 'maxLength',
        message: 'The phone number must have at max 9 numbers',
      },
    ],
    Cpassword: [
      {
        lang: 'fr',
        type: 'required',
        message: 'Le mot de passe est obligatoire',
      },
      {
        lang: 'fr',
        type: 'minlength',
        message: 'Le mot de passe doit avoir au minimum 8 caractères',
      },
      {
        lang: 'en',
        type: 'required',
        message: 'The password is required',
      },
      {
        lang: 'en',
        type: 'minlength',
        message: 'The password must have at least 8 characters',
      },
    ],
  };

  get registerEmail() {
    return this.registerForm.get('registerEmail');
  }

  get registerPassword() {
    return this.registerForm.get('registerPassword');
  }

  get registerName() {
    return this.registerForm.get('registerName');
  }

  get registerCpassword() {
    return this.registerForm.get('registerCpassword');
  }

  get registerSurname() {
    return this.registerForm.get('registerSurname');
  }

  get registerLang() {
    return this.registerForm.get('registerLang');
  }

  get registerTel() {
    return this.registerForm.get('registerTel');
  }

  public registerForm = this.formBuilder.group({
    registerEmail: [
      '',
      Validators.compose([
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
      ]),
    ],
    registerPassword: [
      '',
      Validators.compose([Validators.required, Validators.minLength(8)]),
    ],
    registerName: [
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-Z]*'),
      ]),
    ],
    registerSurname: [
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-Z]*'),
      ]),
      ,
    ],
    registerLang: [this.userService.language, Validators.required],
    registerCpassword: [
      '',
      Validators.compose([Validators.required, Validators.minLength(8)]),
    ],
    registerTel: [
      '',
      Validators.compose([
        Validators.required,
        Validators.maxLength(9),
        Validators.minLength(9),
        Validators.pattern('^6{1}[5-9]{1}[0-9]{7}$'),
      ]),
    ],
  });
}
