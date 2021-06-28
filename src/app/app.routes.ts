import { Routes } from '@angular/router';
import { BusinessPageComponent } from './pages/business/business.component';
import { HomePageComponent } from './pages/home/home.component';
import { LoginPageComponent } from './pages/login/login.component';
import { NotFoundPageComponent } from './pages/not-found/not-found.component';
import { RegisterPageComponent } from './pages/register/register.component';

// TODO: Implementar os guards loggedin, login e permition
export const ROUTES: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'business-register', component: BusinessPageComponent },
  { path: 'business-register/:id', component: BusinessPageComponent },
  { path: '**', component: NotFoundPageComponent },
];
