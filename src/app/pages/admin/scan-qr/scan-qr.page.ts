import { UserService } from './../../../services/user.service';
import { TranslationService } from './../../../services/translation.service';
import { NavigationService } from './../../../services/navigation.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { BarcodeScanner, SupportedFormat } from '@capacitor-community/barcode-scanner';
import { MenuController } from '@ionic/angular';
import { NgxQrcodeElementTypes } from '@techiediaries/ngx-qrcode';

@Component({
  selector: 'app-scan-qr',
  templateUrl: './scan-qr.page.html',
  styleUrls: ['./scan-qr.page.scss'],
})
export class ScanQRPage implements OnInit, OnDestroy {

  textToCode: string = '';
  myAngularxQrCode: string = '';
  qrCodeDownloadLink: SafeUrl = '';
  elementType: "url" | "img" | "canvas" | "svg" = "url"; 

  content_visibility = '';
  scannedResult: any;
  showCamera: boolean = false;
  menuChoice: string = 'home';

  translate: any = {};

  constructor(
    private navigationService: NavigationService,
    private menu: MenuController,
    private translationService: TranslationService,
    private userService: UserService,



  ) { }

  ngOnInit() {
    this.myAngularxQrCode = 'Informations du QR code';
    this.translate = this.translationService.getTranslation(this.userService.language);
  }

  public ionViewWillEnter(): void {
    this.translate = this.translationService.getTranslation(this.userService.language);
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    this.menu.enable(true);
  }

  nextStep() {
    console.log(this.scannedResult);
    this.navigationService.goToWithId('/scanChoice', this.scannedResult);
  }

  async checkPermission() {
    let response: boolean = false;
    try {
      // check or request permission
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        // the user garanted permission
        response = true;
        return response;
      }
      response = false;
      return response;
    } catch (e) {
      console.log(e);
    }
    return response;
  }

  async startScan() {
    try {
      this.content_visibility = 'hidden';
      const permission = await this.checkPermission();
      if (!permission) {
        return;
      }
      await BarcodeScanner.hideBackground();
      document.getElementsByTagName('body')[0].style.opacity = '0';
      let body = document.querySelector('body') as HTMLBodyElement;
      body.classList.add('scanner-active');
      const result = await BarcodeScanner.startScan({ targetedFormats: [SupportedFormat.QR_CODE] });
      this.content_visibility = 'hidden';
      BarcodeScanner.showBackground();
      body.classList.remove('scanner-active');
      if (result?.hasContent) {
        this.scannedResult = result.content;
        BarcodeScanner.showBackground();
        body.classList.remove('scanner-active');
        this.content_visibility = '';
      }
    } catch (e) {
      console.log(e);
      this.stopScan();
    }
  }
 
  stopScan() {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    let body = document.querySelector('body') as HTMLBodyElement;
    document.getElementsByTagName('body')[0].style.opacity = '1';
    body.classList.remove('scanner-active');
    this.content_visibility = '';
  }

  createQRCode() {
    this.myAngularxQrCode = this.textToCode;
    this.textToCode = '';
  }

  onChangeURL(url: SafeUrl) {
    this.qrCodeDownloadLink = url;
  }

  subMenuAction(choice: string) {
    this.menuChoice = choice;
  }

  // scanCode() {
  //   this.showCamera = true;
  //   // Optionally request the permission early
  //   this.qrScanner.prepare()
  //     .then((status: QRScannerStatus) => {
  //       if (status.authorized) {
  //         // start scanning
  //         console.log('Scan en cours...' + JSON.stringify(status));
  //         const scanSub = this.qrScanner.scan().subscribe((text: any) => {
  //           console.log('Scanned something', text.result);
  //           this.textScanned = text.result;
  //           this.qrScanner.hide(); // hide camera preview
  //           scanSub.unsubscribe(); // stop scanning
  //           this.showCamera = false;
  //         });
  //       } else if (status.denied) {
  //         // camera permission was permanently denied
  //       } else {
  //         // permission was denied, but not permanently. You can ask for permission again at a later time.
  //       }
  //     })
  //     .catch((e: any) => console.log('Error is', e));
  // }

  ngOnDestroy(): void {
    this.stopScan();
  }

  scanCode() {

  }

  downnloadQR() {

  }

}
