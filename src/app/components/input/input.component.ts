import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormatterLib } from 'src/lib/formatter.lib';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit, AfterViewInit {
  public isRequiredError: boolean;
  public hasError: boolean;

  @Input() form!: FormGroup;
  @Input() label!: string;
  @Input() type!: string;
  @Input() placeholder!: string;
  @Input() control!: string;
  @Input() required: boolean;

  constructor(private cdr: ChangeDetectorRef, private formatter: FormatterLib) {
    this.isRequiredError = false;
    this.hasError = false;
    this.required = false;
  }

  ngOnInit(): void {}

  get mask(): any {
    switch (this.type) {
      case 'cpf':
        return this.formatter.masks.cpf;
      case 'cnpj':
        return this.formatter.masks.cnpj;
      case 'tel':
        return this.formatter.masks.tel;
      case 'cel':
        return this.formatter.masks.cel;
      case 'number':
        return this.formatter.masks.number;
      case 'date':
        return this.formatter.masks.date;
      case 'cep':
        return this.formatter.masks.cep;
      case 'cnh':
        return this.formatter.masks.cnh;
      case 'account':
        return this.formatter.masks.account;
      case 'agency':
        return this.formatter.masks.agency;
      case 'currency':
        return this.formatter.masks.currency;
    }

    return null;
  }

  ngAfterViewInit() {
    this.form.valueChanges.subscribe(() => {
      this.hasError =
        this.form.get(this.control)?.errors &&
        (this.form.get(this.control)?.dirty ||
          this.form.get(this.control)?.touched)
          ? true
          : false;

      this.isRequiredError = this.form.get(this.control)?.errors?.required;
      this.cdr.detectChanges();
    });
  }
}
