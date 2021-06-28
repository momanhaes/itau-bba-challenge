import { Component, OnInit, ViewChild } from '@angular/core';
import { IBusiness } from 'src/app/components/table/table.interface';
import { BusinessService } from 'src/app/services/business.service';
import { catchError } from 'rxjs/operators';
import {
  KeyType,
  SessionStorageService,
} from 'src/app/services/session-storage.service';
import { MatSort } from '@angular/material/sort';
import { FormControl, FormGroup } from '@angular/forms';
import { APPEARD } from 'src/app/animations/appeard.animation';
import { Subscription } from 'rxjs';
import { WindowService } from 'src/app/services/window.service';

export interface IError {
  isError: boolean;
  origin: string;
  content: any; // TODO: Corrigir tipagem
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [APPEARD],
})
export class HomePageComponent implements OnInit {
  public state = 'ready';
  public subscribeMobile!: Subscription;
  public isMobile: boolean;
  public searchForm!: FormGroup;
  public searchTerm!: string;
  public data!: IBusiness[];
  public isLoading!: boolean;
  public error: IError = {
    content: null,
    isError: false,
    origin: '',
  };

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private businessService: BusinessService,
    private windowService: WindowService,
    private sessionStorageService: SessionStorageService
  ) {
    {
      this.isMobile = window.innerWidth <= windowService.widthMobile;
    }
  }

  ngOnInit(): void {
    this.subscribeMobile = this.windowService.hasMobile.subscribe(
      (hasMobile: boolean) => (this.isMobile = hasMobile)
    );

    this.getData();
    this.searchForm = new FormGroup({ searchControl: new FormControl('') });
    this.searchForm.valueChanges.subscribe((searchTerm) => {
      // TODO: Deve chamar o endpoint de busca
      console.log(
        `Deve chamar o endpoint de busca passando o termo '${searchTerm.searchControl}'`
      );
    });
  }

  private getData(): void {
    this.isLoading = true;

    setTimeout(() => {
      this.businessService
        .business()
        .pipe(
          catchError((err) => {
            this.error.isError = true;
            this.error.content = err;
            this.isLoading = false;
            return (this.data = []);
          })
        )
        .subscribe((business: IBusiness[]) => {
          this.sessionStorageService.set(KeyType.BUSINESS, business);
          this.data = business;
          this.isLoading = false;
        });
    }, 500);
  }
}
