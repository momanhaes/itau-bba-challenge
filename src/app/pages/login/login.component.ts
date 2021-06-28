import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { APPEARD } from 'src/app/animations/appeard.animation';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';
import { ALERT_THEME } from 'src/app/utils/theme';
import { LOGIN_INPUTS } from './login.const';

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
    private notificationService: NotificationService
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

  public login() {
    if (this.form.invalid) {
      return;
    }

    const user = this.form.value;

    // TODO: Implementar observable com chamada real
    this.userService.login(user.email, user.password);
    this.notificationService.notify(`Bem-vindo, ${user.name}!`);
    this.router.navigate(['/home']);
  }
}
