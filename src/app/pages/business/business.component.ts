import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IBusiness } from 'src/app/components/table/table.interface';
import { BusinessService } from 'src/app/services/business.service';
import { ALERT_THEME } from 'src/app/utils/theme';
import { IError } from '../home/home.component';
import { catchError } from 'rxjs/operators';
import { APPEARD } from 'src/app/animations/appeard.animation';
import { ADDRESS_INPUTS, BUSINESS_INPUTS } from './business.const';
import { ICEP } from 'src/app/services/cep.service';
import Swal from 'sweetalert2';

export interface IInput {
  label: string;
  placeholder: string;
  control: string;
  required: boolean;
  class: string;
  type: string;
}

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss'],
  animations: [APPEARD],
})
export class BusinessPageComponent implements OnInit {
  public businessStatus: { name: string; value: string }[];
  public alertTheme = ALERT_THEME;
  public isLoading: boolean;
  public addressInputs!: IInput[];
  public businessInputs!: IInput[];
  public state = 'ready';
  public form!: FormGroup;
  public data!: IBusiness;
  public isEdit = false;
  public error: IError = {
    content: null,
    isError: false,
    origin: '',
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private businessService: BusinessService
  ) {
    this.isLoading = false;
    this.businessStatus = [
      {
        name: 'Sim',
        value: 'Sim',
      },
      {
        name: 'Não',
        value: 'Não',
      },
    ];
  }

  private add(business: IBusiness) {
    // TODO: Aqui deve chamar o serviço de criação de polo
    this.showSuccess(business);
    this.router.navigate(['/home']);
  }

  private update(business: IBusiness) {
    // TODO: Aqui deve chamar o serviço de atualização de polo
    this.showSuccess(business);
    this.router.navigate(['/home']);
  }

  public getFormAddressInputs(): IInput[] {
    return ADDRESS_INPUTS;
  }

  public getFormBusinessInputs(): IInput[] {
    return BUSINESS_INPUTS;
  }

  public showError(error: any): void {
    Swal.fire({
      title: `Ops!`,
      text: error ? error : 'Ocorreu um erro ao buscar polo.',
      icon: 'error',
      background: this.alertTheme.background,
      iconColor: this.alertTheme.iconColor,
      showCancelButton: false,
      confirmButtonColor: this.alertTheme.confirmButtonColor,
      confirmButtonText: 'Ok',
    }).then(() => this.router.navigate(['/home']));
  }

  public getAddress(cep: ICEP) {
    this.form.patchValue({
      addressName: cep.logradouro,
      neighborhood: cep.bairro,
      state: cep.uf,
      city: cep.localidade,
    });
  }

  public showSuccess(business: any): void {
    console.table(business);

    Swal.fire({
      title: 'Sucesso!',
      text: this.isEdit
        ? `Você editou o polo '${business.businessName}'.`
        : `Você cadastrou o polo '${business.businessName}'.`,
      icon: 'success',
      background: this.alertTheme.background,
      iconColor: this.alertTheme.iconColor,
      showCancelButton: false,
      confirmButtonColor: this.alertTheme.confirmButtonColor,
      confirmButtonText: 'Ok',
    });
  }

  public action(): void {
    if (this.form.invalid) {
      return;
    }

    const business: IBusiness = this.form.value;

    this.isLoading = true;
    this.isEdit ? this.update(business) : this.add(business);
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      cep: new FormControl(''),
      businessName: new FormControl(''),
      neighborhood: new FormControl(''),
      state: new FormControl(''),
      city: new FormControl(''),
      addressName: new FormControl(''),
      type: new FormControl(''),
      valuation: new FormControl(''),
      cnpj: new FormControl(''),
      active: new FormControl(''),
    });

    this.addressInputs = this.getFormAddressInputs();
    this.businessInputs = this.getFormBusinessInputs();
    const id = this.route.snapshot.params['id'];

    if (id) {
      this.isEdit = true;
      this.isLoading = true;

      setTimeout(() => {
        this.businessService
          .businessById(id)
          .pipe(
            catchError((err) => {
              this.isLoading = false;
              this.showError(err.error.error);
              return err;
            })
          )
          .subscribe((business: any) => {
            this.data = business;

            this.form.patchValue({
              cep: this.data.cep,
              businessName: this.data.name,
              type: this.data.business,
              valuation: this.data.valuation,
              cnpj: this.data.cnpj,
              active: this.data.active ? 'Sim' : 'Não',
            });

            this.isLoading = false;
          });
      }, 500);
    }
  }
}
