import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, MenuController, PopoverController } from '@ionic/angular';
import { NavigationService } from '../../../services/navigation.service';
import { AuthService } from '../../../services/auth.service';
import { PopoverComponent } from 'src/app/components/popover/popover.component';
import { TranslationService } from 'src/app/services/translation.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-manage-admin',
  templateUrl: './manage-admin.page.html',
  styleUrls: ['./manage-admin.page.scss'],
})
export class ManageAdminPage implements OnInit {
  @ViewChild(IonModal) myModal: IonModal = {} as IonModal;

  currentAccount = {} as any;
  public translate: any = {};

  constructor(
    private menu: MenuController,
    private authService: AuthService,
    private navigationService: NavigationService,
    private translationService: TranslationService,
    private userService: UserService,
    public popoverCtrl: PopoverController,
  ) {}

  public ionViewWillEnter(): void {
    this.translate = this.translationService.getTranslation(this.userService.language);
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    this.menu.enable(true);
  }

  ngOnInit() {
    this.translate = this.translationService.getTranslation(this.userService.language);
  }

  public changeAdminStatus(event: any): void {
    if (event.target.checked) console.log(event.target.checked);
  }

  logout() {
    this.authService.logout();
    this.navigationService.goto('/login');
  }

  cancel() {
    this.myModal.dismiss(null, 'cancel');
  }

  async presentPopover(event: Event, idAdmin: string) {
    const popover = await this.popoverCtrl.create({
      component: PopoverComponent,
      componentProps: { type: 'adminManagement', id: idAdmin },
      mode: 'md',
    });
    await popover.present();
  }
}
