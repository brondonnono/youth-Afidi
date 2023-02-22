import { TranslationService } from './../../../services/translation.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DateParserService } from 'src/app/services/date-parser.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage {

  data: any[] = [];
  tmp = [
    {
      adherent: {
        adherentID: 1,
        name: 'FABIEN',
        parentID: 1
      },
      histories: [
        {
          id: 1,
          day: '02/11/2022',
          arrivedHour: '12h45',
          leavingHour: '13h30'
        },
        {
          id: 2,
          day: '20/10/2022',
          arrivedHour: '12h50',
          leavingHour: '14h00'
        },
        {
          id: 3,
          day: '01/11/2022',
          arrivedHour: '12h47',
          leavingHour: '14h20'
        }
      ]
    },
    {
      adherent: {
        adherentID: 2,
        name: 'RAOUL',
        parentID: 1
      },
      histories: [
        {
          id: 1,
          day: '02/11/2022',
          arrivedHour: '12h45',
          leavingHour: '13h30'
        },
        {
          id: 2,
          day: '20/10/2022',
          arrivedHour: '12h50',
          leavingHour: '14h00'
        },
        {
          id: 3,
          day: '01/11/2022',
          arrivedHour: '12h47',
          leavingHour: '14h20'
        }
      ]
    },
    
  ];
  
  public translate: any = {};
  constructor(
    private translationService: TranslationService,
    private authService: AuthService,
    private navigationService: NavigationService,
    private dateParserService: DateParserService,
    private storageService: StorageService,
    private userService: UserService,

  ) {
    this.getHistories();
    this.translate = this.translationService.getTranslation(this.userService.language);
  }

  getHistories() {
    this.data = this.tmp;
    return this.data;
  }

  logout() {
    this.authService.logout();
    this.navigationService.goto('/welcome');
  }

  toLocalDate(day: string) {
    return day;
  }

  ionViewWillEnter() {
    this.translate = this.translationService.getTranslation(this.userService.language);
  }
}
