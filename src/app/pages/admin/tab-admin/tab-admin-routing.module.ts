import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabAdminPage } from './tab-admin.page';

const routes: Routes = [
  {
    path: '',
    component: TabAdminPage,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardPageModule)
      },
      {
        path: 'qrcode',
        loadChildren: () => import('../scan-qr/scan-qr.module').then(m => m.ScanQRPageModule)
      },
      {
        path: '',
        redirectTo: '/tabAdmin/qrcode',
        pathMatch: 'full'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabAdminPageRoutingModule {}
