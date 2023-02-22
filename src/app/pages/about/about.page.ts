import { UserService } from './../../services/user.service';
import { TranslationService } from './../../services/translation.service';
import { Component } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { PopoverComponent } from 'src/app/components/popover/popover.component';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage {

  location = 'Cameroun';

  selectOptions = {
    header: 'Localisation'
  };

  public translate: any = {};
  constructor(
    private translationService: TranslationService,
    public popoverCtrl: PopoverController,
    private userService: UserService,

  ) {
    this.translate = this.translationService.getTranslation(this.userService.language);
    this.selectOptions.header = this.translate.about.location;
  }

  async presentPopover(event: Event) {
    const popover = await this.popoverCtrl.create({
      component: PopoverComponent,
      componentProps: {type:'about'},
      mode: 'md'
    });
    await popover.present();
  }

  ionViewWillEnter(){
    this.translate = this.translationService.getTranslation(this.userService.language);
  }

}
