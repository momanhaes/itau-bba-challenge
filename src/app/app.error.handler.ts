import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from './services/notification.service';

@Injectable()
export class ApplicationErrorHandler extends ErrorHandler {
  constructor(
    private notificationService: NotificationService,
    private router: Router,
    private zone: NgZone
  ) {
    super();
  }

  handleError(errorResponse: HttpErrorResponse | any) {
    if (errorResponse instanceof HttpErrorResponse) {
      const message = errorResponse.error.message;
      this.zone.run(() => {
        switch (errorResponse.status) {
          case 401:
            this.router.navigate(['/login']);
            break;
          case 403:
            this.notificationService.notify(message || 'Não autorizado.');
            break;
          case 404:
            this.notificationService.notify(
              message || 'Recurso não encontrado.'
            );
            break;
        }
      });
    }

    super.handleError(errorResponse);
  }
}
