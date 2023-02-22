import { FormBuilder, Validators } from '@angular/forms';

export class ProfilValidator {

  public constructor(protected formBuilder: FormBuilder) {}

  public errorMessages = {
    nom: [
      { lang:'fr', type: 'required', message:'Ce champ est obligatoire' },
      { lang:'fr', type: 'pattern', message: 'Le Nom ne doit contenir que des lettres de l\'alphabet' },
      { lang:'en', type: 'required', message:'This field is required' },
      { lang:'en', type: 'pattern', message:'The last name must contain only letters of the alphabet' }
    ],
    prenom: [
      { lang:'fr', type: 'required', message:'Ce champ est obligatoire' },
      { lang:'fr', type: 'pattern', message:'Le Prenom ne doit contenir que des lettres de l\'alphabet' },
      { lang:'en', type: 'required', message:'This field is required' },
      { lang:'en', type: 'pattern', message:'The first name must contain only letters of the alphabet' }
    ],
    
    password: [
      { lang:'fr', type: 'required', message:'Le mot de passe est obligatoire' },
      { lang:'fr', type: 'minlength', message:'Le mot de passe doit avoir au minimum 8 caractères' },
      { lang:'en', type: 'required', message:'The password is required' },
      { lang:'en', type: 'minlength', message:'The password must have at least 8 characters' }
    ],
    confirmPassword: [
      { lang:'fr', type: 'required', message:'Le mot de passe est obligatoire' },
      { lang:'fr', type: 'minlength', message:'Le mot de passe doit avoir au minimum 8 caractères' },
      { lang:'en', type: 'required', message:'The password is required' },
      { lang:'en', type: 'minlength', message:'The password must have at least 8 characters' }
    ]
  };

  get profilNom() {
    return this.profilForm.get('profilNom');
  }

  get profilPrenom() {
    return this.profilForm.get('profilPrenom');
  }

  get profilPassword() {
    return this.profilForm.get('profilPassword');
  }

  get profilConfirmPassword() {
    return this.profilForm.get('profilConfirmPassword');
  }

  public profilForm = this.formBuilder.group({
    profilNom: [
      '',
      [
        Validators.required
      ]
    ],
    profilPrenom: [
      '',
      [
        Validators.required
      ]
    ],
    profilPassword: [
      '',
      [
        Validators.required,
        Validators.minLength(8)
      ]
    ],
    profilConfirmPassword: [
      '',
      [
        Validators.required,
        Validators.minLength(8)
      ]
    ]

  });
}
