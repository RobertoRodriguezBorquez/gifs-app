import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard-page/dashboard-page')
  },
  {
    path: 'trending',
    loadComponent: () =>
      import('./pages/trending-page/trending-page')
      
  },
  {
    path: 'search',
    loadComponent: () =>
      import('./pages/search-page/search-page')
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
