import { TokenStorageService } from './../token-storage.service';
import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';


const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

  constructor(private token: TokenStorageService, private router: Router) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('in intercept');
    let authReq = request;
    if (this.token.getToken() != null) {
      authReq = request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + this.token.getToken())});
    }
    return next.handle(authReq).pipe(
      tap(
        event => { console.log(event); },
        error => {
          if (error instanceof HttpErrorResponse) {
            if (error.status === 401) {
              // redirect to the login route
              // or show a modal
              console.log('here');
              this.router.navigate(['/login']);
            }
          }
        }
      )
    );
}

}
