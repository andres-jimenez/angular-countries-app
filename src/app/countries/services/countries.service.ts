import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Country } from '../interfaces/country';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private apiUrl: string = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore = {
    byCapital: { query: '', countries: [] },
    byCountry: { query: '', countries: [] },
    byRegion: { region: undefined, countries: [] },
  };

  constructor(private http: HttpClient) {
    this.loadFromLocalStorage();
  }

  private getCountriesRequest(url: string): Observable<Country[] | undefined> {
    return this.http.get<Country[]>(url).pipe(catchError(() => of(undefined)));
  }

  private saveToLocalStorage() {
    localStorage.setItem('cache-store', JSON.stringify(this.cacheStore));
  }

  private loadFromLocalStorage() {
    const cacheStore = localStorage.getItem('cache-store');

    if (!cacheStore) return;

    this.cacheStore = JSON.parse(cacheStore);
  }

  searchCountry(alphaCode: string): Observable<Country | undefined> {
    return this.http
      .get<Country[]>(`${this.apiUrl}/alpha/${alphaCode}`)
      .pipe(map((countries) => countries[0]))
      .pipe(catchError(() => of(undefined)));
  }

  searchByCapital(capital: string): Observable<Country[] | undefined> {
    return this.getCountriesRequest(`${this.apiUrl}/capital/${capital}`).pipe(
      tap(
        (countries) =>
          (this.cacheStore.byCapital = { query: capital, countries })
      ),
      tap(() => this.saveToLocalStorage())
    );
  }

  searchByCountry(country: string): Observable<Country[] | undefined> {
    return this.getCountriesRequest(`${this.apiUrl}/name/${country}`).pipe(
      tap(
        (countries) =>
          (this.cacheStore.byCountry = { query: country, countries })
      ),
      tap(() => this.saveToLocalStorage())
    );
  }

  searchByRegion(region: Region): Observable<Country[] | undefined> {
    return this.getCountriesRequest(`${this.apiUrl}/region/${region}`).pipe(
      tap((countries) => (this.cacheStore.byRegion = { region, countries })),
      tap(() => this.saveToLocalStorage())
    );
  }
}
