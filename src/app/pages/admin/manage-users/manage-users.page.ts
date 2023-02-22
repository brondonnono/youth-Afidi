import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { NavigationService } from 'src/app/services/navigation.service';
import { TranslationService } from 'src/app/services/translation.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.page.html',
  styleUrls: ['./manage-users.page.scss'],
})
export class ManageUsersPage implements OnInit {

  translate: any = {};
  isOpen: boolean = false;
  dataDetails: string = '';

  constructor(
    private menu: MenuController,
    private authService: AuthService,
    private navigationService: NavigationService,
    private userService: UserService,
    private translationService: TranslationService
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
  
  logout() {
    this.authService.logout();
    this.navigationService.goto('/login');
  }
  
  showDetails(id: string) {
    this.isOpen = true;
    this.dataDetails = id;
  }

  closeModal() {
    this.isOpen = false;
  }

  delete(elem: any) {
    elem.hidden = true;
  }
}
