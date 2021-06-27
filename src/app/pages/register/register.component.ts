import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { APPEARD } from 'src/app/animations/appeard.animation';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [APPEARD],
})
export class RegisterPageComponent implements OnInit {
  public form!: FormGroup;
  public state = 'ready';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  public register() {
    this.router.navigate(['/login']);
  }
}
