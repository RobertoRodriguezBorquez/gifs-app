import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard-page/dashboard-page'),
    children: [
      {
        path: 'trending',
        loadComponent: () => import('./pages/trending-page/trending-page'),
      },
      {
        path: 'search',
        loadComponent: () => import('./pages/search-page/search-page'),
      },
      {
    path: '**',
    redirectTo: 'trending',
  },
    ],
  },

  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
