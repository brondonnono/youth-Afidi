import { TranslationService } from './../../../services/translation.service';
import { MenuController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tab-admin',
  templateUrl: './tab-admin.page.html',
  styleUrls: ['./tab-admin.page.scss'],
})
export class TabAdminPage implements OnInit {

  public translate: any = {};

  constructor(
    private menu: MenuController,
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

  ionViewWillLeave() {
    this.menu.enable(true);
  }
}
