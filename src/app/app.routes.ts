import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login/login.component';

export const ROUTES: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
];
