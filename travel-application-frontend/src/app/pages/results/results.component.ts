import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Itinerary } from 'src/app/core/models';
import { ItineraryService } from 'src/app/core/services';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit {
  departureCity!: string;
  arrivalCity!: string;
  date!: Date;
  itineraries$?: Observable<Itinerary[]>;

  constructor(
    private route: ActivatedRoute,
    private itineraryService: ItineraryService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.departureCity = params['departure'];
      this.arrivalCity = params['arrival'];
      this.date = new Date(params['date']);
    });

    this.itineraries$ = this.itineraryService.getItineraries();
    this.itineraryService.get(this.departureCity, this.arrivalCity, this.date);
  }
}
