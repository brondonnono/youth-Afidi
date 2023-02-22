import { Injectable } from '@angular/core';
import { LoadingController, AlertController, ToastController, ToastButton } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(
    private loadingController: LoadingController,
    private alertController: AlertController,
    private toastController: ToastController,
  ) { }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
      mode: 'ios'
    });
    alert.present();
  }

  async showToast(message: string, type: string, duration?: number, position?: 'top' | 'bottom' | 'middle') {
    let button: ToastButton = {
      side: 'start',
      icon: 'checkmark-done-outline'
    };
    let cssClass = 'toast-success-class';
    switch (type) {
      case 'success':
        button.icon = 'checkmark-done-outline'
        cssClass = 'toast-success-class'
        break;

      case 'danger':
        button.icon = 'ban-outline'
        cssClass = 'toast-danger-class'
        break;

      case 'warning':
        button.icon = 'alert-circle-outline'
        cssClass = 'toast-warning-class'
        break;

      case 'info':
        button.icon = 'information-circle-outline'
        cssClass = 'toast-info-class'
        break;

      default:
        button.icon = 'checkmark-done-outline'
        cssClass = 'toast-success-class'
        break;
    }
   const toast = await this.toastController.create({
      header: message,
      duration: duration? duration : 3500,
      position: position? position : 'top',
      cssClass: cssClass,
      buttons: [button],
      mode: 'ios'
    });
    // Present the toast at the top of the page
    await toast.present();
  }

  async showLoader(message?: string) {
    const loading = await this.loadingController.create({
      message: message? message : 'Patientez...',
      mode: 'ios',
      spinner: 'bubbles'
    });
    await loading.present();
  }

  async dismiss() {
    await this.loadingController.dismiss();
  }
}
