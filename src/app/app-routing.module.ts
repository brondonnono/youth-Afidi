import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { IsconnectedGuard } from './guards/isconnected.guard';
import {
  redirectUnauthorizedTo,
  redirectLoggedInTo,
  canActivate,
} from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'welcome',
    loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomePageModule),
    ...canActivate(redirectLoggedInToHome)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/login/login.module').then(m => m.LoginPageModule),
    ...canActivate(redirectLoggedInToHome)

  },
  {
    path: 'register',
    loadChildren: () => import('./pages/auth/register/register.module').then(m => m.RegisterPageModule),
    ...canActivate(redirectLoggedInToHome)

  },
  {
    path: 'forgot',
    loadChildren: () => import('./pages/auth/forgot/forgot.module').then(m => m.ForgotPageModule),
    ...canActivate(redirectLoggedInToHome)

  },
  {
    path: 'home',
    loadChildren: () => import('./pages/client/home/home.module').then(m => m.HomePageModule),
    ...canActivate(redirectUnauthorizedToLogin)

  },
  {
    path: 'tabAdmin',
    loadChildren: () => import('./pages/admin/tab-admin/tab-admin.module').then(m => m.TabAdminPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'manageAdmin',
    loadChildren: () => import('./pages/admin/manage-admin/manage-admin.module').then(m => m.ManageAdminPageModule),
    ...canActivate(redirectUnauthorizedToLogin)

  },
  {
    path: 'profileAdmin',
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfilePageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'manageAdherent',
    loadChildren: () => import('./pages/admin/manage-adherent/manage-adherent.module').then(m => m.ManageAdherentPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'manageActivities',
    loadChildren: () => import('./pages/admin/manage-activities/manage-activities.module').then(m => m.ManageActivitiesPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
  },
  {
    path: 'manageUsers',
    loadChildren: () => import('./pages/admin/manage-users/manage-users.module').then(m => m.ManageUsersPageModule),
    ...canActivate(redirectUnauthorizedToLogin)
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
