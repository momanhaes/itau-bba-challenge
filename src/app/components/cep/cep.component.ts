import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CEPService, ICEP } from 'src/app/services/cep.service';
import { catchError } from 'rxjs/operators';
import { IError } from 'src/app/pages/home/home.component';

@Component({
  selector: 'app-cep',
  templateUrl: './cep.component.html',
  styleUrls: ['./cep.component.scss'],
})
export class CepComponent implements OnInit {
  public isLoading: boolean = false;
  public error: IError = {
    content: null,
    isError: false,
    origin: '',
  };

  @Output() addressByCepEvent = new EventEmitter<ICEP>();
  @Input() form!: FormGroup;

  constructor(private cepService: CEPService) {}

  public findAddressByCEP(cep: string) {
    if (!cep) return;

    const cepOnlyNumbers = cep.replace(/\.|\-/g, '');

    if (cepOnlyNumbers?.length !== 8) return;

    this.isLoading = true;

    this.cepService
      .getAddress(cep)
      .pipe(
        catchError((err) => {
          this.error.isError = true;
          this.isLoading = false;
          return (this.error.content = err);
        })
      )
      .subscribe((cep: any) => {
        this.addressByCepEvent.emit(cep);
        this.isLoading = false;
      });
  }

  ngOnInit(): void {
    const cep = this.form.value.cep;
    this.findAddressByCEP(cep);
  }
}
