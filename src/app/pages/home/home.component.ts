import { Component, OnInit, ViewChild } from '@angular/core';
import { IBusiness } from 'src/app/components/table/table.interface';
import { BusinessService } from 'src/app/services/business.service';
import { catchError } from 'rxjs/operators';
import { MatSort } from '@angular/material/sort';
import { FormControl, FormGroup } from '@angular/forms';
import { APPEARD } from 'src/app/animations/appeard.animation';
import { Subscription } from 'rxjs';
import { WindowService } from 'src/app/services/window.service';
import { LanguageService, LanguageType } from 'src/app/services/i18n.service';
import { HOME_CONTENT } from 'src/app/locale/content.const';

export interface IError {
  isError: boolean;
  origin: string;
  content: any; // TODO: Corrigir tipagem
}

export interface IContent {
  title: string;
  subtitle: string;
  error: string;
  search: string;
  button: string;
}

export interface ICMS {
  pt: IContent;
  en: IContent;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [APPEARD],
})
export class HomePageComponent implements OnInit {
  public state: string = 'ready';
  public language: string;
  public CMS!: ICMS;
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
    private languageService: LanguageService,
    private windowService: WindowService
  ) {
    {
      this.isMobile = window.innerWidth <= windowService.widthMobile;
      this.language = LanguageType.PT;
    }
  }

  ngOnInit(): void {
    this.subscribeMobile = this.windowService.hasMobile.subscribe(
      (hasMobile: boolean) => (this.isMobile = hasMobile)
    );

    this.languageService.notifier.subscribe((language) => {
      this.language = language;
    });

    this.CMS = HOME_CONTENT;

    this.getData();
    this.searchForm = new FormGroup({ searchControl: new FormControl('') });
    this.searchForm.valueChanges.subscribe((searchTerm) => {
      this.searchTerm = searchTerm.searchControl;

      const result: IBusiness[] = this.data.filter(
        (item) =>
          item.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          item.business.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          item.valuation.toString().includes(this.searchTerm)
      );

      this.businessService.updateBusiness(result);
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
          this.data = business;
          this.isLoading = false;
        });
    }, 500);
  }

  public getContent(origin: string) {
    switch (origin) {
      case 'title':
        return this.language === LanguageType.PT
          ? this.CMS.pt.title
          : this.CMS.en.title;

      case 'subtitle':
        return this.language === LanguageType.PT
          ? this.CMS.pt.subtitle
          : this.CMS.en.subtitle;

      case 'error':
        return this.language === LanguageType.PT
          ? this.CMS.pt.error
          : this.CMS.en.error;

      case 'search':
        return this.language === LanguageType.PT
          ? this.CMS.pt.search
          : this.CMS.en.search;

      case 'button':
        return this.language === LanguageType.PT
          ? this.CMS.pt.button
          : this.CMS.en.button;

      default:
        return '';
    }
  }
}
