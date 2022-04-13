import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Location } from 'src/app/core/models';
import { LocationService } from 'src/app/core/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  locations$?: Observable<Location[]>;
  selectedCity!: string;
  searchForm!: FormGroup;
  currentDate!: Date;
  constructor(
    private locationService: LocationService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentDate = new Date();
    this.locations$ = this.locationService.getLocations();
    this.locationService.get();
    if (!this.searchForm) {
      this.createForm();
    }
  }

  submit(): void {
    if (this.searchForm.valid) {
      const departureCity = this.searchForm.get('departureCity');
      const arrivalCity = this.searchForm.get('arrivalCity');
      const date = this.searchForm.get('datepicker');
      this.router.navigate(['results'], {
        queryParams: {
          departure: departureCity?.value,
          arrival: arrivalCity?.value,
          date: date?.value,
        },
      });
    } else if (
      !this.searchForm.get('departureCity')?.value &&
      !this.searchForm.get('arrivalCity')?.value &&
      !this.searchForm.get('datepicker')?.value
    ) {
      this.router.navigate(['results']);
    }
  }
  private createForm(): void {
    this.searchForm = this.formBuilder.group({
      departureCity: [null, [Validators.required]],
      arrivalCity: [null, [Validators.required]],
      datepicker: [null, [Validators.required]],
    });
  }
}
