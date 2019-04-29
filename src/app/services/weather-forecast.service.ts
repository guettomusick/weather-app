import { Injectable } from '@angular/core';

import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherForecastService {

  constructor(private httpService: HttpService) { }

  getWeatherForecast(zipcode: number) {
    return this.httpService.getForecast(zipcode);
  }
}
