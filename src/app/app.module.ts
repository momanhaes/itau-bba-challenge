import { ErrorHandler, LOCALE_ID, NgModule } from '@angular/core';

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
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';

import { NgxMaskModule } from 'ngx-mask';
import {
  CurrencyMaskModule,
  CurrencyMaskConfig,
  CURRENCY_MASK_CONFIG,
} from 'ng2-currency-mask';

import { LoginPageComponent } from './pages/login/login.component';
import { HomePageComponent } from './pages/home/home.component';
import { RegisterPageComponent } from './pages/register/register.component';
import { BusinessPageComponent } from './pages/business/business.component';
import { NotFoundPageComponent } from './pages/not-found/not-found.component';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ButtonComponent } from './components/button/button.component';
import { TableComponent } from './components/table/table.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { InputComponent } from './components/input/input.component';
import { CepComponent } from './components/cep/cep.component';
import { MenuComponent } from './components/menu/menu.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { ListComponent } from './components/list/list.component';
import { ItemComponent } from './components/item/item.component';

import { WindowService } from './services/window.service';
import { BusinessService } from './services/business.service';
import { NotificationService } from './services/notification.service';
import { LanguageService } from './services/i18n.service';
import { FormatterLib } from 'src/lib/formatter.lib';
import { CEPService } from './services/cep.service';

import { ApplicationErrorHandler } from './app.error.handler';

import { ResizeDirective } from './directives/resize.directive';
import { ROUTES } from './app.routes';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: 'left',
  allowNegative: true,
  decimal: ',',
  precision: 2,
  prefix: '',
  suffix: '',
  thousands: '.',
};

registerLocaleData(localePt, 'pt');

const PROVIDERS = [
  NotificationService,
  BusinessService,
  LanguageService,
  WindowService,
  FormatterLib,
  CEPService,
  { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig },
  { provide: LOCALE_ID, useValue: 'pt' },
  { provide: ErrorHandler, useClass: ApplicationErrorHandler },
];

const DECLARATIONS = [
  AppComponent,
  ResizeDirective,
  LoginPageComponent,
  HomePageComponent,
  RegisterPageComponent,
  BusinessPageComponent,
  NotFoundPageComponent,
  SnackbarComponent,
  HeaderComponent,
  FooterComponent,
  ButtonComponent,
  TableComponent,
  SpinnerComponent,
  InputComponent,
  CepComponent,
  MenuComponent,
  ListComponent,
  ItemComponent,
];

const EXTERNAL_MODULES = [NgxMaskModule.forRoot(), CurrencyMaskModule];

const ANGULAR_MODULES = [
  RouterModule.forRoot(ROUTES),
  BrowserModule,
  BrowserAnimationsModule,
  ReactiveFormsModule,
  HttpClientModule,
  FormsModule,
  MatCardModule,
];

const MATERIAL_MODULES = [
  MatToolbarModule,
  MatProgressSpinnerModule,
  MatIconModule,
  MatButtonModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatInputModule,
  MatMenuModule,
];

@NgModule({
  declarations: [...DECLARATIONS],
  imports: [...ANGULAR_MODULES, ...MATERIAL_MODULES, ...EXTERNAL_MODULES],
  providers: [...PROVIDERS],
  bootstrap: [AppComponent],
})
export class AppModule {}
