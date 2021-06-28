import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService, LanguageType } from 'src/app/services/i18n.service';
import { IUser, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  public user: IUser;
  public lang: string;

  constructor(
    private router: Router,
    private userService: UserService,
    private languageService: LanguageService
  ) {
    this.user = {
      name: 'Matheus',
      cargo: 'Cliente',
      email: 'momanhaes@gmail.com',
      password: '123456',
    };

    this.lang = LanguageType.PT;
  }

  ngOnInit(): void {}

  public changeLanguage(lang: string) {
    this.lang = lang;
    this.languageService.updateLanguage(lang);
  }

  public logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
