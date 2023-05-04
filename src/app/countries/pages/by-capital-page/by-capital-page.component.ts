import { Component, OnInit } from '@angular/core';

import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
})
export class ByCapitalPageComponent implements OnInit {
  public query?: string = '';
  public countries?: Country[] = [];
  public isLoading: boolean = false;

  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCapital.countries;
    this.query = this.countriesService.cacheStore.byCapital.query;
  }

  searchByCapital(capital: string): void {
    this.isLoading = true;

    this.countriesService.searchByCapital(capital).subscribe((countries) => {
      this.countries = countries;
      this.isLoading = false;
    });
  }
}
