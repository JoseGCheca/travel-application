import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, filter, map, mergeMap } from 'rxjs/operators';

import { Itinerary } from '../models';
import { handleError } from '../utils/http.utils';

@Injectable({
  providedIn: 'root',
})
export class ItineraryService {
  private itineraries$: BehaviorSubject<Itinerary[]> = new BehaviorSubject(
    [] as Itinerary[]
  );

  constructor(private http: HttpClient) {}

  getItineraries(): Observable<Itinerary[]> {
    return this.itineraries$.asObservable().pipe(
      mergeMap((data) => {
        return of(data);
      }),
      filter((data) => {
        return data !== null;
      })
    );
    // const templates = await this.getAll().toPromise();
    // this.templates$.next(templates);
  }

  getItineraryValue(): Itinerary[] {
    return this.itineraries$.getValue();
  }
  // Resets template to force observable update
  refresh(): void {
    if (this.itineraries$.getValue() !== null) {
      this.itineraries$.next({ ...this.itineraries$.getValue() });
    }
  }

  get(departureLocation: string, arrivalLocation: string, date: Date): void {
    this.http.get<Itinerary[]>('/itineraries').subscribe(
      (data) => {
        let parsedData = this.parseData(data);
        if (departureLocation && arrivalLocation && date) {
          parsedData = parsedData.reduce((acc: Itinerary[], itinerary: Itinerary) => {
            if (
              departureLocation === itinerary.departureLocation &&
              arrivalLocation === itinerary.arrivalLocation &&
              date.getTime() < itinerary.departureDate.getTime()
            ) {
              acc.push(itinerary);
            }
            return acc;
          }, []);
        }

        return this.itineraries$.next(parsedData);
      },
      (error) => catchError(handleError)
    );
  }

  parseData(data: Itinerary[]): Itinerary[] {
    const parsedData: Itinerary[] = data.map((itinerary: Itinerary) => ({
      ...itinerary,
      arrivalDate: this.convertDate(itinerary.arrivalDate),
      departureDate: this.convertDate(itinerary.departureDate),
    }));

    return parsedData;
  }

  convertDate(responseDate: any): Date {
    return new Date(
      responseDate.year,
      responseDate.month,
      responseDate.dayOfMonth,
      responseDate.hourOfDay,
      responseDate.minute,
      responseDate.second
    );
  }
}
