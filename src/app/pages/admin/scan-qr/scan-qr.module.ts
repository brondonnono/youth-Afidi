import { SharedModule } from './../../../modules/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScanQRPageRoutingModule } from './scan-qr-routing.module';

import { ScanQRPage } from './scan-qr.page';
import { QRCodeModule } from 'angularx-qrcode';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QRCodeModule,
    NgxQRCodeModule,
    ScanQRPageRoutingModule,
    SharedModule
  ],
  declarations: [ScanQRPage]
})
export class ScanQRPageModule {}
