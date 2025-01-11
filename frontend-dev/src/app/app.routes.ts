import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/user/user.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./components/home/home.component').then((m) => HomeComponent),
    title: 'Home',
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./components/registration/registration.component').then(
        (m) => RegistrationComponent
      ),
    title: 'Register',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.component').then((m) => LoginComponent),
    title: 'Login',
  },
  {
    path: 'users',
    loadComponent: () =>
      import('./components/user/user.component').then((m) => UserComponent),
    title: 'Users',
  },
];
