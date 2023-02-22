import { UserService } from './../../../services/user.service';
import { TranslationService } from './../../../services/translation.service';
import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { NavigationService } from 'src/app/services/navigation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {


  public selectOptions = {
    header: 'Sélectionnez une langue'
  };

  public translate: any = {};

  public lang: string = '';

  constructor(
    private menu: MenuController,
    private translationService: TranslationService,
    private userService: UserService,
    private router: Router,
    public navigationService: NavigationService,
  ) { }

  ngOnInit() {
    this.translate = this.translationService.getTranslation(this.getUserLocalLanguage());
  }

  getUserLocalLanguage(): string {
    this.lang = this.userService.language;
    return this.lang;
  }

  setUserLocalLanguage(lang: string) {
    this.userService.language = lang;
    this.userService.userData.language = lang;
    this.lang = lang;
  }

  public ionViewWillEnter(): void {
    this.translate = this.translationService.getTranslation(this.userService.language);
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    this.menu.enable(true);
  }

  public changeLanguage(event: any): void {
    this.setUserLocalLanguage(event.detail.value);
    this.translate = this.translationService.getTranslation(this.lang);
    this.selectOptions = {
      header: this.translate.chooseLanguage
    };
  }

  goto(url: string) {
    this.router.navigate([url]);
  }
}
