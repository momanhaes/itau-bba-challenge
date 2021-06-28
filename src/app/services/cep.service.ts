import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VIA_CEP_API } from '../app.api';

export interface ICEP {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

@Injectable({ providedIn: 'root' })
export class CEPService {
  constructor(private httpClient: HttpClient) {}

  public getAddress(cep: string): Observable<ICEP> {
    return this.httpClient.get<ICEP>(`${VIA_CEP_API}${cep}/json`);
  }
}
