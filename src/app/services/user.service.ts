import { Injectable } from '@angular/core';
import { KeyType, LocalStorageService } from './local-storage.service';
import { SessionStorageService } from './session-storage.service';

export interface IUserInfo {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface IUser {
  name: string;
  email: string;
  token?: string;
  cargo?: string;
  password: string;
}

export enum PositionType {
  CLIENTE = 'Cliente',
  DIRETOR = 'Diretor',
}

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(
    private localStorageService: LocalStorageService,
    private sessionStorageService: SessionStorageService
  ) {}

  public aleatoryToken() {
    return new Date().getTime();
  }

  public create(user: IUser): IUser {
    // TODO: Deve chamar endpoint de criação de login
    const newUser: IUser = {
      name: user.name,
      email: user.email,
      password: user.password,
      cargo: PositionType.CLIENTE,
      token: this.aleatoryToken().toString(),
    };

    this.localStorageService.set(KeyType.USER, newUser);
    return newUser;
  }

  // TODO: Corrigir tipagem
  public login(email: string, password: string): any {
    // TODO: Deve chamar endpoint de login
    const user: IUser = this.localStorageService.get(KeyType.USER);

    if (user?.email === email && user?.password === password) {
      return this.localStorageService.set(KeyType.LOGGEDIN, true);
    }
  }

  public isLoggedIn(): boolean {
    return this.localStorageService.get(KeyType.LOGGEDIN);
  }

  public logout(): void {
    this.localStorageService.remove(KeyType.LOGGEDIN);
  }
}
