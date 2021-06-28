import { Injectable } from '@angular/core';
export interface IUserInfo {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  cargo?: string;
  token?: string;
}

export enum PositionType {
  CLIENTE = 'Cliente',
  DIRETOR = 'Diretor',
}

@Injectable({ providedIn: 'root' })
export class UserService {
  public user!: IUser;

  constructor() {
    this.user = {
      email: '',
      password: '',
      name: '',
      token: this.aleatoryToken(),
    };
  }

  // TODO: Desmockar token e receber pelo JWT
  public aleatoryToken() {
    return new Date().getTime().toString();
  }

  public create(user: IUser): IUser {
    // TODO: Deve chamar endpoint de criação de login
    const newUser: IUser = {
      name: user.name,
      email: user.email,
      password: user.password,
      cargo: PositionType.CLIENTE,
      token: this.aleatoryToken(),
    };

    return newUser;
  }

  public login(email: string, password: string): void {
    // TODO: Deve chamar endpoint de login
  }

  public isLoggedIn(): void {
    // TODO: Deve verificar se o usuário está salvo na sessão
  }

  public logout(): void {
    // TODO: Deve deslogar o usuário
  }
}
