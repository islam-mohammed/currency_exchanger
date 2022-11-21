import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CustomErrorHandler implements ErrorHandler {
  constructor(private zone: NgZone) {}
  handleError(error: unknown): void {
    this.zone.run(() => {
      // TODO: show error message widget or snackebar
    });
    console.error('Cought by Custom Error Handler:', error);
  }
  handleHttpError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
