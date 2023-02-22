import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { StorageService } from './services/storage.service';
import { SplashScreen } from '@capacitor/splash-screen';
import { Keys } from './configs/key';
import { NavigationService } from './services/navigation.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  loggedIn = false;
  dark = false;
  lang = 'fr';

  public appPages = [
    {
      title: 'Programme',
      url: '/home/program',
      icon: 'calendar',
    },
    {
      title: 'Activités',
      url: '/home/activities',
      icon: 'aperture',
    },
    {
      title: 'Historique',
      url: '/home/history',
      icon: 'reader',
    },
    // {
    //   title: 'Actualités',
    //   url: '/home/actualities',
    //   icon: 'newspaper'
    // },
    // {
    //   title: 'Afidi Awards',
    //   url: '/awards',
    //   icon: 'trophy'
    // },
    {
      title: 'A propos de nous',
      url: '/home/about',
      icon: 'information-circle',
    },
    // {
    //   title: 'Nos partenaires',
    //   url: '/partners/partner-list',
    //   icon: 'business'
    // },
    // {
    //   title: 'Devenir un partenaire',
    //   url: '/partners/partner-add',
    //   icon: 'help-buoy'
    // },
    // {
    //   title: 'Faire un don',
    //   url: '/donate',
    //   icon: 'gift'
    // },
    // help-buoy
  ];

  public appPagesEn = [
    {
      title: 'Program',
      url: '/home/program',
      icon: 'calendar',
    },
    {
      title: 'Activities',
      url: '/home/activities',
      icon: 'aperture',
    },
    {
      title: 'History',
      url: '/home/history',
      icon: 'reader',
    },
    // {
    //   title: 'Actualities',
    //   url: '/home/actualities',
    //   icon: 'newspaper'
    // },
    // {
    //   title: 'Afidi Awards',
    //   url: '/awards',
    //   icon: 'trophy'
    // },
    {
      title: 'About us',
      url: '/home/about',
      icon: 'information-circle',
    },
    // {
    //   title: 'Our partners',
    //   url: '/partners/partner-list',
    //   icon: 'business'
    // },
    // {
    //   title: 'Be a partner',
    //   url: '/partners/partner-add',
    //   icon: 'help-buoy'
    // },
    // {
    //   title: 'donate',
    //   url: '/donate',
    //   icon: 'gift'
    // },
    // help-buoy
  ];

  public appPagesFr = [
    {
      title: 'Programme',
      url: '/home/program',
      icon: 'calendar',
    },
    {
      title: 'Activités',
      url: '/home/activities',
      icon: 'aperture',
    },
    {
      title: 'Historique',
      url: '/home/history',
      icon: 'reader',
    },
    // {
    //   title: 'Actualités',
    //   url: '/home/actualities',
    //   icon: 'newspaper'
    // },
    // {
    //   title: 'Afidi Awards',
    //   url: '/awards',
    //   icon: 'trophy'
    // },
    {
      title: 'A propos de nous',
      url: '/home/about',
      icon: 'information-circle',
    },
    // {
    //   title: 'Nos partenaires',
    //   url: '/partners/partner-list',
    //   icon: 'business'
    // },
    // {
    //   title: 'Devenir un partenaire',
    //   url: '/partners/partner-add',
    //   icon: 'help-buoy'
    // },
    // {
    //   title: 'Faire un don',
    //   url: '/donate',
    //   icon: 'gift'
    // },
    // help-buoy
  ];

  constructor(
    private platform: Platform,
    private authService: AuthService,
    private userService: UserService,
    private afAuth: AngularFireAuth,
    private storageService: StorageService,
    private navigationService: NavigationService,
  ) {
    this.initializeApp();
  }

  async getUserLanguage() {
    await this.storageService
      .getData(Keys.lang)
      .then(
        (res) => {
          this.lang = res as string;
          if (this.lang == null) {
            this.lang = 'fr';
            this.storageService.deleteData(Keys.lang);
            this.storageService.setData(Keys.lang, this.lang);
          }
          this.userService.changeUserLanguage(this.lang);
        },
        (reject) => console.log(reject)
      )
      .catch((err) => console.log('error', err));
  }

  getCorrectMenu() {
    SplashScreen.hide();
    if (this.lang == 'en') this.appPages = this.appPagesEn;
    else this.appPages = this.appPagesFr;
  }

  private async initializeApp() {
    SplashScreen.show();
    await this.platform.ready().then(() => {
      this.afAuth.authState.subscribe(auth => {
        if (!auth) {
          console.log('non connecté');
          this.navigationService.gotoWithUrl('/welcome');
          this.loggedIn = false;
          this.storageService.setData('isConnected', 'false');
        } else {
          this.userService.getUser(auth.uid).valueChanges().subscribe(res => {
            console.log(res, ' result');
            this.navigationService.gotoWithUrl('/tabAdmin');
            console.log('Connecté: ' + auth.uid);
            this.loggedIn = true;
            this.storageService.setData('isConnected', 'true');
            this.getUserLanguage();
            this.getCorrectMenu();
          });
        }
      });
      SplashScreen.hide();
    });
  }

  logout() {
    this.authService.logout();
  }
}
