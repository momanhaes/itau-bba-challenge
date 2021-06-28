import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BUSINESS_API } from '../app.api';
import { IBusiness } from '../components/table/table.interface';

@Injectable({ providedIn: 'root' })
export class BusinessService {
  private itauEndpoint = '/itau_teste';
  public notifier = new EventEmitter<any>();

  constructor(private httpClient: HttpClient) {}

  public business(): Observable<IBusiness[]> {
    return this.httpClient.get<IBusiness[]>(
      `${BUSINESS_API}${this.itauEndpoint}`
    );
  }

  public businessById(id: string): Observable<IBusiness> {
    return this.httpClient.get<IBusiness>(
      `${BUSINESS_API}${this.itauEndpoint}/${id}`
    );
  }

  public updateBusiness(business: IBusiness[]): void {
    this.notifier.emit(business);
  }
}
