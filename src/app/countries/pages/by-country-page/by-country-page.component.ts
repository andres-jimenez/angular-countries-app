import { Component, OnInit } from '@angular/core';

import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'countries-by-country-page',
  templateUrl: './by-country-page.component.html',
})
export class ByCountryPageComponent implements OnInit {
  public query?: string = '';
  public countries?: Country[] = [];
  public isLoading: boolean = false;

  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.query = this.countriesService.cacheStore.byCountry.query;
    this.countries = this.countriesService.cacheStore.byCountry.countries;
  }

  searchByCountry(country: string): void {
    this.isLoading = true;

    this.countriesService.searchByCountry(country).subscribe((countries) => {
      this.countries = countries;
      this.isLoading = false;
    });
  }
}
