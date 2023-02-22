import { UserService } from './../../services/user.service';
import { TranslationService } from './../../services/translation.service';
import { MenuController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  public translate: any = {};
  constructor(
    public menu: MenuController,
    private translationService: TranslationService,
    private userService: UserService,

  ) { }

  ngOnInit() {
    this.translate = this.translationService.getTranslation(this.userService.language);
  }

  public ionViewWillEnter(): void {
    this.translate = this.translationService.getTranslation(this.userService.language);
    this.menu.enable(false);
  }

  public ionViewWillLeave(): void {
    this.menu.enable(true);
  }
}
