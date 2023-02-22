import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageAdherentPageRoutingModule } from './manage-adherent-routing.module';

import { ManageAdherentPage } from './manage-adherent.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageAdherentPageRoutingModule
  ],
  declarations: [ManageAdherentPage]
})
export class ManageAdherentPageModule {}
