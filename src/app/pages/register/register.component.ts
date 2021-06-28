import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { APPEARD } from 'src/app/animations/appeard.animation';
import {
  KeyType,
  LocalStorageService,
} from 'src/app/services/local-storage.service';
import { ALERT_THEME } from 'src/app/utils/theme';
import { ILoginInput } from '../login/login.component';
import { REGISTER_INPUTS } from './register.const';
import Swal from 'sweetalert2';
import { IUser, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [APPEARD],
})
export class RegisterPageComponent implements OnInit {
  public registerInputs!: ILoginInput[];
  public alertTheme = ALERT_THEME;
  public form!: FormGroup;
  public state = 'ready';

  constructor(
    private router: Router,
    private userSerive: UserService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
    });

    this.registerInputs = this.geRegisterInputs();
  }

  public geRegisterInputs(): ILoginInput[] {
    return REGISTER_INPUTS;
  }

  // TODO: Corrigir tipagem
  public showSuccess(user: any): void {
    Swal.fire({
      title: `Parabéns, ${user.name}!`,
      text: `Você efetuou seu cadastro com sucesso.`,
      icon: 'success',
      background: this.alertTheme.background,
      iconColor: this.alertTheme.iconColor,
      showCancelButton: false,
      confirmButtonColor: this.alertTheme.confirmButtonColor,
      confirmButtonText: 'Ok',
    });
  }

  public register() {
    const user: IUser = {
      name: this.form.get('name')?.value,
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value,
    };

    this.userSerive.create(user);

    // TODO: Aqui deve chamar o serviço de criação de usuário
    this.showSuccess(user);
    this.router.navigate(['/login']);
  }
}
