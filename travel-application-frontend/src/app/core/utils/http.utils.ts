import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

export function handleError(error: HttpErrorResponse): Observable<never> {
  if (error.status === 0) {
   return throwError(() => {
       new Error ( 'Server did not respond');
    });
  }

  if (error.error) {
    return throwError(() => {error.error});
  }

  return throwError(() => {
       new Error ( 'Unknown error');
    });
}
