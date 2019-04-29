import { Forecast } from './forecast';
import { Injectable } from '@angular/core';
import { ModelAdapter } from '../interfaces/model-adapter';
import { TimeZone } from './timezone';

import moment from 'moment-timezone';
import _ from 'lodash';

export interface Forecast {
  temperature: number;
  humidity: number;
  icon: string;
  description: string;
  time: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: number;
  pressure: number;
}

export class Forecasts {
  constructor(
    public city: string,
    public tz: TimeZone,
    public forecasts: Forecast[] = []
  ) {}
}

@Injectable({
  providedIn: 'root'
})
export class ForecastAdapter implements ModelAdapter<Forecasts> {

  adapt(data: {forecasts: any, tz: TimeZone}): Forecasts {
    const city: string = _.get(data, 'forecasts.city.name', '');
    const forecastsData = _.get(data, 'forecasts.list', []);

    const forecasts = forecastsData.map(fc => ({
      temperature: _.get(fc, 'main.temp'),
      humidity: _.get(fc, 'main.humidity'),
      icon: _.get(fc, 'weather[0].description', '').replace(/\s/g, '_').toLowerCase(),
      description: _.get(fc, 'weather[0].description'),
      time: moment.tz(_.get(fc, 'dt', 0) * 1000, 0),
      wind: {
        speed: _.get(fc, 'wind.speed'),
        deg: _.get(fc, 'wind.deg')
      },
      clouds: _.get(fc, 'clouds.all'),
      pressure: _.get(fc, 'main.pressure'),
    }));

    return new Forecasts(city, data.tz, forecasts);
  }
}
