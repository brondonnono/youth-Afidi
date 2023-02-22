import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { Person } from 'src/app/models/person';
import { Visitor } from 'src/app/models/visitor';
import { DateParserService } from 'src/app/services/date-parser.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss'],
})
export class AddMemberComponent implements OnInit {
  public isScholarized: boolean = false;
  public havePhoneNumber: boolean = false;
  public parentHavePhoneNumber: boolean = false;
  public isCorrect: boolean = false;

  @Input() addMember: boolean = false;

  public haveAccount: boolean = false;
  public country: string = 'CMR';

  public cities: any[] = [];
  public quaters: any[] = [];
  public selectedCity: string = '';
  public selectedQuater: string = '';

  public memberForm: FormGroup = new FormBuilder().group({});

  public visitorForm: FormGroup = new FormBuilder().group({});

  constructor(
    private fb: FormBuilder,
    private utilService: UtilService,
    private dateParserService: DateParserService
  ) {}

  ngOnInit() {
    this.cities = this.getCities();
    switch (this.addMember) {
      case true:
        this.memberForm = this.fb.group({
          name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
          tutorName: [
            '',
            [Validators.required, Validators.pattern('/^[a-zA-Z ]*$/')],
          ],
          birthDate: new FormControl(new Date().toISOString().slice(0, -1)),
          city: [null, [Validators.required]],
          quater: [null, [Validators.required]],
          profession: [
            '',
            [Validators.required, Validators.pattern('[a-zA-Z ]*')],
          ],
          schoolName: ['', [Validators.pattern('[a-zA-Z0-9 ]*')]],
          classGrade: ['', [Validators.pattern('[a-zA-Z0-9 ]*')]],
          tel: ['', [Validators.maxLength(9), Validators.minLength(9)]],
          tutorTel: ['', [Validators.maxLength(9), Validators.minLength(9)]],
        });
        break;
      case false:
        this.visitorForm = this.fb.group({
          name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
          surname: [
            '',
            [Validators.required, Validators.pattern('/^[a-zA-Z ]*$/')],
          ],
          city: [null, [Validators.required]],
          quater: [null, [Validators.required]],
          havePhone: [false, [Validators.required]],
          profession: [
            '',
            [Validators.required, Validators.pattern('[a-zA-Z ]*')],
          ],
          tel: ['', [Validators.maxLength(9), Validators.minLength(9)]],
        });
    }
  }

  get visitorName() {
    return this.visitorForm.get('name');
  }

  get visitorSurname() {
    return this.visitorForm.get('surname');
  }

  get visitorCity() {
    return this.visitorForm.get('city');
  }

  get visitorQuater() {
    return this.visitorForm.get('quater');
  }

  get visitorProfession() {
    return this.visitorForm.get('profession');
  }

  get visitorTel() {
    return this.visitorForm.get('tel');
  }

  get visitorHavePhone() {
    return this.visitorForm.get('havePhone');
  }

  scholarToggleChanged() {
    this.isScholarized = !this.isScholarized;
  }

  getCities(): any[] {
    let tmpCities = [
      {
        code: 'Yde',
        name: 'Yaoundé',
      },
      {
        code: 'Dla',
        name: 'Douala',
      },
    ];
    return tmpCities;
  }

  async saveVisitorData() {
    await this.utilService.showLoader();
    try {
      let person: Person = new Person(
        this.visitorName?.value,
        this.visitorSurname?.value,
        this.country,
        this.visitorCity?.value,
        this.visitorQuater?.value
      );
      person.setHaveAccount = this.haveAccount;
      person.setHavePhone = this.visitorHavePhone?.value;
      person.setNumTel = this.visitorTel?.value;

      let visitor: Visitor = new Visitor(
        '',
        this.dateParserService.getLocalFormatedDateTime(new Date())
      );
      console.log('personne =>', person, '  visiteur =>', visitor);
      await this.utilService.dismiss();
      await this.utilService.showToast('Opération réussie', 'success');
    } catch (error) {
      await this.utilService.dismiss();
      await this.utilService.showToast('Une erreur est survenue', 'danger');
      console.log(error);
    }
  }

  getQuaters(city: string): string[] {
    let tmpYde = ['AHALA', 'HAWAÏ'];
    let tmpDla = ['ANGE RAPHAEL'];
    return city == 'Yde' ? tmpYde : tmpDla;
  }

  cityChanged(event: any) {
    this.selectedCity = event.detail.value;
    console.log(this.selectedCity);
    this.quaters = this.getQuaters(this.selectedCity);
  }

  quaterChanged(event: any) {
    this.selectedQuater = event.detail.value;
  }

  phoneToggleChanged() {
    this.havePhoneNumber = !this.havePhoneNumber;
  }

  parentPhoneToggleChanged() {
    this.parentHavePhoneNumber = !this.parentHavePhoneNumber;
  }

  saveMemberData() {}
}
