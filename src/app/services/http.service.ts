import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { ForecastAdapter } from './../models/forecast';
import { TimezoneAdapter, TimeZone } from '../models/timezone';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient,
    private forecastAdapter: ForecastAdapter,
    private timezoneAdapter: TimezoneAdapter
  ) {}

  getForecast(zipcode: number) {
    const key = environment.weatherForecast.apiKey;
    const url = environment.weatherForecast.apiUrl;

    return this.http.get(`${url}?zip=${zipcode}&appid=${key}`)
    .pipe(switchMap((forecasts: any) => {
      return this.getTimeZone(forecasts.city.coord)
      .pipe(map((tz: any) => this.forecastAdapter.adapt({forecasts, tz})));
    }));
  }

  getTimeZone(coord: {lat: number, lon: number}) {
    const lat = coord.lat;
    const lon = coord.lon;
    const ts = Math.floor(Date.now() / 1000);
    const key = environment.googleMaps.apiKey;
    const url = environment.googleMaps.apiUrl;

    return this.http.get(`${url}?location=${lat},${lon}&timestamp=${ts}&key=${key}`)
      .pipe(map((data: any) => this.timezoneAdapter.adapt(data)));
  }
}
