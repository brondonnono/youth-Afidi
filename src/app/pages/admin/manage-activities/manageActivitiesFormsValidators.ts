import { FormBuilder, Validators } from '@angular/forms';

export class ManageActivitiesValidator {
  public constructor(
    protected formBuilder: FormBuilder
  ) {}

  public errorMessages = {
    title: [
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
    description: [
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
    startHour: [
      {
        lang: 'fr',
        type: 'required',
        message: "L'heure de début est obligatoire",
      },
      {
        lang: 'en',
        type: 'required',
        message: 'The starting hour is required',
      },
    ],
    date: [
      {
        lang: 'fr',
        type: 'required',
        message: "La date est obligatoire",
      },
      {
        lang: 'en',
        type: 'required',
        message: 'The date is required',
      },
    ],
    endHour: [
      {
        lang: 'fr',
        type: 'required',
        message: "L'heure de fin est obligatoire",
      },
      {
        lang: 'en',
        type: 'required',
        message: 'The ending hour is required',
      },
    ],
  };

  get activityTitle() {
    return this.activityForm.get('activityTitle');
  }

  get activityDescription() {
    return this.activityForm.get('activityDescription');
  }

  get activityDate() {
    return this.activityForm.get('activityDate');
  }

  get activityStartHour() {
    return this.activityForm.get('activityStartHour');
  }

  get activityEndHour() {
    return this.activityForm.get('activityEndHour');
  }

  public activityForm = this.formBuilder.group({
    activityTitle: [
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-Z]*'),
      ]),
    ],
    activityDescription: [
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-Z]*'),
      ]),
    ],
    activityDate: [new Date().toISOString(), Validators.required],
    activityStartHour: [new Date().toISOString(), Validators.required],
    activityEndHour: [new Date().toISOString(), Validators.required],
  });
}
