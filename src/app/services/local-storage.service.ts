import { Injectable } from '@angular/core';

export enum KeyType {
  USER = 'USER',
  BUSINESS = 'BUSINESS',
  LOGGEDIN = 'LOGGEDIN',
}

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  constructor() {}

  /**
   * Verifica se existe uma chave salva no local storage.
   * @param {KeyType} key Chave de acesso para consulta no local storage.
   */
  public has(key: KeyType): boolean {
    return key in localStorage;
  }

  /**
   * Salva um conteúdo no local storage no formato JSON.
   * @param {KeyType} key Chave de acesso para salvar o conteúdo no local storage.
   */
  // TODO: Corrigir tipagem
  public set(key: KeyType, value: any): void {
    this.remove(key);
    localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * Traz um conteúdo do local storage no formato JSON e retorna como objeto JS.
   * @param {KeyType} key Chave de acesso para trazer o conteúdo do local storage.
   */
  // TODO: Corrigir tipagem
  public get(key: KeyType): any {
    return JSON.parse(localStorage.getItem(key) || '{}');
  }

  /**
   * Remove um conteúdo do local storage.
   * @param {KeyType} key Chave de acesso para remover o conteúdo do local storage.
   */
  public remove(key: KeyType): void {
    localStorage.removeItem(key);
  }

  /**
   * Reseta o local storage.
   */
  public clear() {
    localStorage.clear();
  }
}
