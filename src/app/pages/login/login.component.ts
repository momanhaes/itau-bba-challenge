import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { APPEARD } from 'src/app/animations/appeard.animation';
import {
  KeyType,
  LocalStorageService,
} from 'src/app/services/local-storage.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';
import { ALERT_THEME } from 'src/app/utils/theme';
import { LOGIN_INPUTS } from './login.const';
import Swal from 'sweetalert2';

export interface ILoginInput {
  label: string;
  control: string;
  type: string;
  required: boolean;
  placeholder: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [APPEARD],
})
export class LoginPageComponent implements OnInit {
  public loginInputs!: ILoginInput[];
  public alertTheme = ALERT_THEME;
  public state = 'ready';
  public form!: FormGroup;

  constructor(
    private router: Router,
    private userService: UserService,
    private notificationService: NotificationService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });

    this.loginInputs = this.getLoginInputs();
  }

  public getLoginInputs(): ILoginInput[] {
    return LOGIN_INPUTS;
  }

  public showError(): void {
    Swal.fire({
      title: `Ops!`,
      text: 'Ocorreu um erro na autenticação.',
      icon: 'error',
      background: this.alertTheme.background,
      iconColor: this.alertTheme.iconColor,
      showCancelButton: false,
      confirmButtonColor: this.alertTheme.confirmButtonColor,
      confirmButtonText: 'Ok',
    });
  }

  public login() {
    if (this.form.invalid) {
      return;
    }

    const user = this.form.value;

    // TODO: Implementar observable com chamada real
    this.userService.login(user.email, user.password);

    // TODO: Remover essa lógica do front e implementar no back.
    // O serivço de login deve chamar o back e retornar pra esse componente o resultado da autorização
    const userRegistered = this.localStorageService.get(KeyType.USER);
    const isAuth =
      userRegistered.email === user.email &&
      userRegistered.password === user.password
        ? true
        : false;

    if (userRegistered?.name && isAuth) {
      this.notificationService.notify(`Bem-vindo, ${userRegistered.name}!`);
      this.router.navigate(['/home']);
    } else {
      this.showError();
    }
  }
}
