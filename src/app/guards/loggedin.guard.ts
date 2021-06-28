import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';
import { UserService } from '../services/user.service';

// @Injectable()
// export class LoggedInGuard implements CanActivate {
//   constructor(
//     private notificationService: NotificationService,
//     private userService: UserService,
//     private router: Router
//   ) {}

//   canActivate(): boolean {
//     if (this.userService.isLoggedIn()) {
//       return true;
//     } else {
//       this.notificationService.notify('Você está deslogado.');
//       this.router.navigate(['/login']);
//       return false;
//     }
//   }
// }
