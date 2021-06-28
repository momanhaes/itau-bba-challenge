import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { APPEARD } from 'src/app/animations/appeard.animation';
import { ILoginInput } from '../login/login.component';
import { REGISTER_INPUTS } from './register.const';
import { IUser, UserService } from 'src/app/services/user.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [APPEARD],
})
export class RegisterPageComponent implements OnInit {
  public registerInputs!: ILoginInput[];
  public form!: FormGroup;
  public state = 'ready';

  constructor(
    private router: Router,
    private userSerive: UserService,
    private notificationService: NotificationService
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

  public register() {
    if (this.form.invalid) {
      return;
    }

    const user: IUser = {
      name: this.form.get('name')?.value,
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value,
    };

    this.userSerive.create(user);

    // TODO: Aqui deve chamar o serviço de criação de usuário
    this.notificationService.showModal(
      `Parabéns, ${user.name}!`,
      'Você efetuou seu cadastro com sucesso.',
      'success',
      'Ok',
      false
    );

    this.router.navigate(['/login']);
  }
}
