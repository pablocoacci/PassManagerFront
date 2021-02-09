import { AccountService } from './account.service';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class InterceptorService implements HttpInterceptor {

  constructor(private auth: AccountService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headers = req.headers || new HttpHeaders();

    return this.auth.getTokenAsObservable().pipe(
      mergeMap((accessToken: string) => {
        headers = headers.append('Authorization', 'Bearer ' + accessToken);
        return next.handle(req.clone({ headers }));
      }),
      catchError(err => {
        // TODO: when tokens expire redirect to login
        return throwError(err);
      }));
  }
}
