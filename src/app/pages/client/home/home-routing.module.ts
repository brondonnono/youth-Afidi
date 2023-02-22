import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'program',
        loadChildren: () => import('../program/program.module').then(m => m.ProgramPageModule)
      },
      {
        path: 'activities',
        loadChildren: () => import('../activities/activities.module').then(m => m.ActivitiesPageModule)
      },
      {
        path: 'history',
        loadChildren: () => import('../history/history.module').then(m => m.HistoryPageModule)
      },
      {
        path: 'news',
        loadChildren: () => import('../news/news.module').then(m => m.NewsPageModule)
      },
      {
        path: 'about',
        loadChildren: () => import('../../about/about.module').then( m => m.AboutPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then( m => m.ProfilePageModule)
      },
      {
        path: '',
        redirectTo: '/home/program',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/home/program',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
