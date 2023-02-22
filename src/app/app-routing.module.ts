import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes, CanActivate } from '@angular/router';
import { IsconnectedGuard } from './guards/isconnected.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'welcome',
    loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomePageModule),
    canActivate: [IsconnectedGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/login/login.module').then(m => m.LoginPageModule),
    canActivate: [IsconnectedGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/auth/register/register.module').then(m => m.RegisterPageModule),
    canActivate: [IsconnectedGuard]
  },
  {
    path: 'forgot',
    loadChildren: () => import('./pages/auth/forgot/forgot.module').then(m => m.ForgotPageModule),
    canActivate: [IsconnectedGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/client/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'tabAdmin',
    loadChildren: () => import('./pages/admin/tab-admin/tab-admin.module').then(m => m.TabAdminPageModule)
  },
  {
    path: 'manageAdmin',
    loadChildren: () => import('./pages/admin/manage-admin/manage-admin.module').then(m => m.ManageAdminPageModule)
  },
  {
    path: 'profileAdmin',
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfilePageModule)
  },
  {
    path: 'manageAdherent',
    loadChildren: () => import('./pages/admin/manage-adherent/manage-adherent.module').then(m => m.ManageAdherentPageModule)
  },
  {
    path: 'manageActivities',
    loadChildren: () => import('./pages/admin/manage-activities/manage-activities.module').then(m => m.ManageActivitiesPageModule)
  },
  {
    path: 'manageUsers',
    loadChildren: () => import('./pages/admin/manage-users/manage-users.module').then(m => m.ManageUsersPageModule)
  },



  // {
  //   path: '**',
  //   redirectTo: '',
  //   pathMatch: 'full'
  // },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
