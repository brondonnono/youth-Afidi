import { TranslationService } from '../../../services/translation.service';
import { MenuController } from '@ionic/angular';
import { UtilService } from '../../../services/util.service';
import { UserService } from '../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { ProfilValidator } from './profileFormsValidators';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage extends ProfilValidator implements OnInit {

  userData = {} as User;
  imagePath: string = '';
  upload: any;
  image = '';
  imgUrl = '';
  translate: any = {};

  constructor(
    public userService: UserService,
    protected override formBuilder: FormBuilder,
    private utilService: UtilService,
    private menu: MenuController,
    private translationService: TranslationService,
  ) {
    super(formBuilder);
  }

  ngOnInit() {
    this.userData = this.userService.userData;
    if (this.userData.getType === 'client') {
      // this.menu.enable(false);
      console.log(this.userData.getType);
    }
  }

  async addPicture() {
    // if (this.user.userData.language === 'fr') {
    //   const alert = await this.alertCrtl.create({
    //   header: '',
    //   message: '',
    //   buttons: [
    //     {
    //       text: 'Prendre une Photo',
    //       handler: () => {
    //         this.addPhoto('camera');
    //       }
    //     },
    //     {
    //       text: 'Ouvrir la galerie',
    //       handler: () => {
    //         this.addPhoto('library');
    //       }
    //     },
    //   ]
    // });
    //   await alert.present();
    // }
    // else {
    //   const alert = await this.alertCrtl.create({
    //     header: '',
    //     message: '',
    //     buttons: [
    //       {
    //         text: 'Take a Picture',
    //         handler: () => {
    //           this.addPhoto('camera');
    //         }
    //       },
    //       {
    //         text: 'Open gallery',
    //         handler: () => {
    //           this.addPhoto('library');
    //         }
    //       },
    //     ]
    //   });
    //   await alert.present();
    // }
  }

  async addPhoto(source: string) {
    if (source === 'camera') {
      const cameraImage = await this.openCamera();
      this.image = 'data:image/jpg;base64,' + cameraImage;
      //this.user.userData.img = this.image;
    }
    else {
      const libraryImage = await this.openLibrary();
      this.image = 'data:image/jpg;base64,' + libraryImage;
      // this.user.userData.img = this.img;
      // this.uploadFirebase();
      //this.user.userData.img = this.image;
    }
  }


  async openCamera() {
    // const options: CameraOptions = {
    //   quality: 100,
    //   destinationType: this.camera.DestinationType.DATA_URL,
    //   encodingType: this.camera.EncodingType.JPEG,
    //   mediaType: this.camera.MediaType.PICTURE,
    //   targetHeight: 1000,
    //   targetWidth: 1000,
    //   sourceType: this.camera.PictureSourceType.CAMERA
    // };
    // return await this.camera.getPicture(options);
  }

  async openLibrary() {
    // const options: CameraOptions = {
    //   quality: 100,
    //   destinationType: this.camera.DestinationType.DATA_URL,
    //   encodingType: this.camera.EncodingType.JPEG,
    //   mediaType: this.camera.MediaType.PICTURE,
    //   targetHeight: 1000,
    //   targetWidth: 1000,
    //   sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    // };
    // return await this.camera.getPicture(options);
  }

  async uploadFirebase() {
    this.utilService.showLoader();
    this.imagePath = new Date().getTime() + '.jpg';
    // this.upload = this.afSG.ref(this.imagePath).putString(this.image,'data_url');
    // this.upload.then(async () => {
    //   this.afSG.ref(this.imagePath).getDownloadURL().subscribe(url => {
    //     this.imgUrl = url;
    //     console.log(this.imgUrl);
    //   });
    // await this.utilService.dismiss();
    // this.utilService.showToast('Mise à jour terminée', 'success');
    //   })
    // });
  }

  async valider() {
    // upload de la variable user.userData sur le serveur pour remplacer les precedentes informations  
    await this.utilService.showLoader('Veuillez patientez...');
    try {
      // this.uploadFirebase();
      // this.userNewdata = this.user.userData;
      // await this.firestore.collection('users').add(this.userNewdata);
      // this.showToast('Profil mis à jour');
      await this.utilService.dismiss();
    } catch (e: any) {
      this.utilService.showToast(e, 'danger', 5000);
    }
  }

  public ionViewWillEnter(): void {
    this.translate = this.translationService.getTranslation(this.userService.language);
    if (this.userService.userData.getType !== 'client') {
      this.menu.enable(false);
      console.log(this.userService.userData.getType);
    }
  }

  ionViewWillLeave() {
    if (this.userService.userData.getType !== 'client')
      this.menu.enable(true);
  }
}
