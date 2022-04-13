import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, filter, map, mergeMap } from 'rxjs/operators';

import { Location } from '../models';
import { handleError } from '../utils/http.utils';

import { environment } from './../../../assets/environment';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private locations$: BehaviorSubject<Location[]> = new BehaviorSubject([] as Location[]);
  apiPort = environment['API_REST_PORT'];
  apiUrl = environment['API_REST_URL'];
  constructor(private http: HttpClient) {}

  getLocations(): Observable<Location[]> {
    return this.locations$.asObservable().pipe(
      mergeMap((data) => {
        if (data === null) {
          this.get();
        }
        return of(data);
      }),
      filter((data) => data !== null)
    );
  }

  getLocationValue(): Location[] {
    return this.locations$.getValue();
  }
  // Resets template to force observable update
  refresh(): void {
    if (this.locations$.getValue() !== null) {
      this.locations$.next({ ...this.locations$.getValue() });
    }
  }

  get(): void {
    this.http.get<Location[]>('locations').subscribe(
      (data) => this.locations$.next(data),
      (error) => catchError(handleError)
    );
  }
}
