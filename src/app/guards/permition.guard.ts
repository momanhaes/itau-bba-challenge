import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable()
export class PermitionGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  // TODO: Implementar regra com JWT para gerenciar permissões de usuário
  canActivate(): boolean {
    return true;
  }
}
