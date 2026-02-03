import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { asyncScheduler, map, scheduled } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

import { Country } from '../common/country';
import { State } from '../common/state';

@Injectable({
  providedIn: 'root',
})

export class FormService {

  private http = inject(HttpClient);
  private countriesUrl: string = 'http://localhost:8080/api/countries';
  private statesUrl: string = 'http://localhost:8080/api/states';

  constructor() { }

  getCountries(): Observable<Country[]> {
    return this.http.get<GetResponseCountries>(this.countriesUrl).pipe(
      map(response => response._embedded.countries)
    );
  }

  getStates(theCountryCode: string): Observable<State[]> {
    const searchStatesUrl = `${this.statesUrl}/search/findByCountryCode?code=${theCountryCode}`;

    return this.http.get<GetResponseStates>(searchStatesUrl).pipe(
      map(response => response._embedded.states)
    );
  }

  getCreditCardMonths(startMonth: number): Observable<number[]> {
    let data: number[] = [];

    for (let month = startMonth; month <= 12; month++) {
      data.push(month);
    }

    return scheduled([data], asyncScheduler);
  }

  getCreditCardYears(): Observable<number[]> {
    let data: number[] = [];
    let startYear: number = new Date().getFullYear();
    let endYear: number = startYear + 10;

    for (let year = startYear; year <= endYear; year++) {
      data.push(year);
    }

    return scheduled([data], asyncScheduler);
  }
}

interface GetResponseCountries {
  _embedded: {
    countries: Country[];
  }
}

interface GetResponseStates {
  _embedded: {
    states: State[];
  }
}
