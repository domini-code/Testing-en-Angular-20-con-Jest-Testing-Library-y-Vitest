import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'detail/:userId',
    loadComponent: () =>
      import('./components/user-detail/user-detail').then((c) => c.UserDetail),
  },
];
