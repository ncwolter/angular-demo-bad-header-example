import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';
import { take, switchMap } from 'rxjs/operators';


@Injectable()
export class InterceptorOne implements HttpInterceptor {

  constructor(private tokenService: TokenService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    return this.tokenService.token$
      .pipe(
        take(1),
        switchMap((token: string) => {
          request = request.clone({
            setHeaders: {
              token: `Bearer ${token}`,
            }
          });

            return next.handle(request);
        }),
      )
    }
}