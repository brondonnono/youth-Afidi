import { FormBuilder, Validators } from '@angular/forms';

export class LoginValidator {
  public constructor(protected formBuilder: FormBuilder) {}

  public errorMessages = {
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
  };

  get loginEmail() {
    return this.loginForm.get('loginEmail');
  }

  get loginPassword() {
    return this.loginForm.get('loginPassword');
  }

  public loginForm = this.formBuilder.group({
    loginEmail: [
      '',
      Validators.compose([
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
      ]),
    ],
    loginPassword: [
      '',
      Validators.compose([Validators.required, Validators.minLength(8)]),
    ],
  });
}
