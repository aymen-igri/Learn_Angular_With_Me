import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { registerGuard } from './core/guards/register.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '', //redirect to the void path wich is auth, the path will be /login instead of /auth/login
    pathMatch: 'full',
  },
  {
    path: '',
    loadComponent: () =>
      import('./layouts/auth-layout/auth-layout.component').then(
        (c) => c.AuthLayoutComponent
      ),
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/login/login.component').then((m) => m.LoginComponent),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./pages/register/register.component').then(
            (m) => m.RegisterComponent
          ),
        canDeactivate: [registerGuard],
      },
    ],
  },
  {
    path: 'user',
    loadComponent: () =>
      import('./layouts/user-layout/user-layout.component').then(
        (c) => c.UserLayoutComponent
      ),
    canActivate: [authGuard]
  },
];
