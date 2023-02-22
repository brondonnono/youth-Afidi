import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageAdminPageRoutingModule } from './manage-admin-routing.module';

import { ManageAdminPage } from './manage-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageAdminPageRoutingModule
  ],
  declarations: [ManageAdminPage]
})
export class ManageAdminPageModule {}
