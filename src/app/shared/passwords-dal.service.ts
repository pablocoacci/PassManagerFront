import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { PageParams, SortParams } from './models/datatable.models';
import { PasswordsListReq } from './models/passwords-dal.model';

@Injectable({
  providedIn: 'root'
})
export class PasswordsDalService {

  constructor(
    private httpClient: HttpClient, 
    private config: ConfigService
  ) { }

  public getPasswordsList(page: PageParams, sort: SortParams, search: string) {
    let req: PasswordsListReq = {
      PageParams: page,
      SortParams: sort,
      SearchValue: search
    };

    return this.httpClient.post<any>(`${this.config.getProperty('apiUrl')}/passwordsites/get-passwordsite-list`, req);
  }

  public getPasswordDetail(passwordId: string) {
    return this.httpClient.get<any>(`${this.config.getProperty('apiUrl')}/passwordsites/get-passwordsite-byid`, {
      params: {
        PasswordSiteId: passwordId
      }
    });
  }
}
