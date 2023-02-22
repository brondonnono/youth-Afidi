import { TranslationService } from './../../../services/translation.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  public translate: any = {};
  constructor(
    private translationService: TranslationService,
    private userService: UserService,

  ) { }

  ngOnInit() {
    this.translate = this.translationService.getTranslation(this.userService.language);
  }

  ionViewWillEnter() {
    this.translate = this.translationService.getTranslation(this.userService.language);
  }
}
