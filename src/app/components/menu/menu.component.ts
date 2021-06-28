import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  KeyType,
  LocalStorageService,
} from 'src/app/services/local-storage.service';
import { IUser, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  public user: IUser;
  constructor(
    private userService: UserService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {
    this.user = this.localStorageService.get(KeyType.USER);
  }

  ngOnInit(): void {}

  public logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
