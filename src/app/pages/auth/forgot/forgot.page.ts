import { TranslationService } from './../../../services/translation.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MenuController } from '@ionic/angular';
import { NavigationService } from 'src/app/services/navigation.service';
import { UtilService } from 'src/app/services/util.service';
import { UserService } from 'src/app/services/user.service';
import { ForgotValidator } from './forgotFormsValidators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage extends ForgotValidator implements OnInit {
  public translate: any = {};

  constructor(
    public fb: FormBuilder,
    public menu: MenuController,
    private navigationService: NavigationService,
    private utilService: UtilService,
    private userService: UserService,
    private authService: AuthService,
    private translationService: TranslationService
  ) {
    super(fb);
  }

  public ionViewWillEnter(): void {
    this.translate = this.translationService.getTranslation(
      this.userService.language
    );
    this.menu.enable(false);
  }

  public ionViewWillLeave(): void {
    this.menu.enable(true);
  }

  ngOnInit() {
    this.translate = this.translationService.getTranslation(
      this.userService.language
    );
  }

  async forgot() {
    await this.utilService.showLoader(this.translate.util.loading);
    try {
      await this.utilService.dismiss();
      this.authService.resetPasswordTel(this.forgotEmail?.value as string);
      this.utilService.showAlert(
        'Confirmation',
        this.translate.notification.emailExist
      );
      this.navigationService.goto('/login');
    } catch (error) {
      await this.utilService.dismiss();
    }
    await this.utilService.dismiss();
  }
}
