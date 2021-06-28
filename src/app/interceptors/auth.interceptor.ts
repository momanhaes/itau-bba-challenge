import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}

  // TODO: Implementar esse interceptor após implementar o endpoint de login
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const userService = this.injector.get(UserService);

    // TODO: Verificar se o usuário está logado
    if (true) {
      const authRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${userService.user.token}`,
        },
      });
      return next.handle(authRequest);
    } else return next.handle(request);
  }
}
