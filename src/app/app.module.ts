import { LOCALE_ID, NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/login/login.component';
import { HomePageComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ButtonComponent } from './components/button/button.component';
import { TableComponent } from './components/table/table.component';

import { WindowService } from './services/window.service';

import { ResizeDirective } from './directives/resize.directive';
import { ROUTES } from './app.routes';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt, 'pt');

const SERVICES = [WindowService];

const DECLARATIONS = [
  AppComponent,
  ResizeDirective,
  LoginPageComponent,
  HomePageComponent,
  HeaderComponent,
  FooterComponent,
  ButtonComponent,
  TableComponent,
];

const ANGULAR_MODULES = [
  RouterModule.forRoot(ROUTES),
  BrowserModule,
  BrowserAnimationsModule,
  ReactiveFormsModule,
  HttpClientModule,
  FormsModule,
];

const MATERIAL_MODULES = [
  MatToolbarModule,
  MatProgressSpinnerModule,
  MatIconModule,
  MatButtonModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
];

@NgModule({
  declarations: [...DECLARATIONS],
  imports: [...ANGULAR_MODULES, ...MATERIAL_MODULES],
  providers: [...SERVICES, { provide: LOCALE_ID, useValue: 'pt' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
