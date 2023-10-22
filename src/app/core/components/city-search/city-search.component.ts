import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { City } from '../../interfaces/Models.interface';
import { ApiManagementServiceService } from '../../services/api-management-service.service';
import { BehaviorSubject, Observable, debounceTime, distinctUntilChanged, filter, of, switchMap, take, tap } from 'rxjs';
import { ENTER } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.scss']
})
export class CitySearchComponent implements OnInit{

  api = inject(ApiManagementServiceService);

  list = ["Warszawa", "Lublin", "Gdansk", "wrocalw", "olsztyn", "slupsk", "Krakow"];

  private optionsSubject = new BehaviorSubject<City[]>([]);
  options$: Observable<City[]> = this.optionsSubject.asObservable();
  control = new FormControl<string>('');
  cities: City[];
  selectedCity2: string = '';
  selectedCity: City;

  // selectedOption: string = '';

  // cityIsPicked: boolean = false;

  ngOnInit(): void {

  }

  onEnter(event: Event): void {
    if (event instanceof KeyboardEvent) {
      if (event.key === 'Enter' && this.control.value) {
        this.api.getAutoCompleteLocations(this.control.value).subscribe((res) => {
          this.cities = res;
          // Emituj nową wartość do options$
          this.optionsSubject.next(this.cities);
        });
      }
    }
  }

  chooseCity(city: City): void {
    this.selectedCity = city;
    // this.selectedCity = city.LocalizedName;
  }
}
