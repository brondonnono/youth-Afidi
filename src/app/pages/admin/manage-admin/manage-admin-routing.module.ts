import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageAdminPage } from './manage-admin.page';

const routes: Routes = [
  {
    path: '',
    component: ManageAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageAdminPageRoutingModule {}
