import { Forecasts } from './models/forecast';
import { Component } from '@angular/core';

import { WeatherForecastService } from './services/weather-forecast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'WeatherApp';
  forecastData: Forecasts;
  loading = false;
  useTz = false;
  usedTz = 'Etc/UTC';
  undefinedAttribute;
  undefinedAttributeTyped: string;

  constructor(private weatherForecast: WeatherForecastService) {}

  onZipChange(zipcode) {
    if (!zipcode) {
      this.forecastData = null;
      return;
    }

    this.loading = true;

    this.weatherForecast.getWeatherForecast(zipcode)
    .subscribe(data => {
      this.forecastData = data;
      if (this.useTz) {
        this.usedTz = this.forecastData.tz.timeZoneId;
      }
      this.loading = false;
    });
  }
  
  onUseTzChange(useTz: boolean) {
    this.useTz = useTz;
    this.usedTz = 'Etc/UTC';
    if (useTz && this.forecastData) {
      this.usedTz = this.forecastData.tz.timeZoneId;
    }
  }
  
  someMethod() {
    let undefinedVariable;
    let undefinedVariableTyped: string;
    
    console.log(this.undefinedAttribute.length);
    console.log(this.undefinedAttributeTyped.length);
    console.log(undefinedVariable.length);
    console.log(undefinedVariableTyped.length);
    this.undefinedAttribute = undefined;
    this.undefinedAttributeTyped = undefined;
    undefinedVariable = undefined;
    undefinedVariableTyped = undefined;
  }
}
