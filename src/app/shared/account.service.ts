import { ConfigService } from './config.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginRequest } from './models/account.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  static readonly TOKEN = 'token';
  static readonly UserName = 'account';

  constructor(
    private httpClient: HttpClient, 
    private config: ConfigService) { }

  login(data: LoginRequest) {
    return new Observable(o => {
      this.httpClient
        .post<any>(`${this.config.getProperty('apiUrl')}/account/login`, data)
        .subscribe(
          response => {
            localStorage.setItem(AccountService.TOKEN, response.data.accessToken);
            localStorage.setItem(AccountService.UserName, data.userName);
            o.next();
          },
          error => {
            o.error(error.error);
          }
        );
    });
  }

  getToken() {
    return localStorage.getItem(AccountService.TOKEN);
  }

  clearToken() {
    return localStorage.clear();
  }

  getTokenAsObservable() {
    return new Observable<string>(o => {
      o.next(this.getToken());
    });
  }

  isLoggedIn() {
    return this.getToken() != null && this.getToken() !== undefined;
  }
}
