import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { APPEARD } from 'src/app/animations/appeard.animation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [APPEARD],
})
export class LoginPageComponent implements OnInit {
  public state = 'ready';
  public form!: FormGroup;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  public login() {
    this.router.navigate(['/home']);
  }
}
