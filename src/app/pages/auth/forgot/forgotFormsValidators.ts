import { FormBuilder, Validators } from '@angular/forms';

export class ForgotValidator {
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
  };

  get forgotEmail() {
    return this.forgotForm.get('forgotEmail');
  }

  public forgotForm = this.formBuilder.group({
    forgotEmail: [
      '',
      Validators.compose([
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
      ]),
    ],
  });
}
