import { Forecasts } from './../models/forecast';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-weather-list',
  templateUrl: './weather-list.component.html',
  styleUrls: ['./weather-list.component.scss']
})
export class WeatherListComponent {
  @Input() data: Forecasts;
  @Input() loading: boolean;
  @Input() usedTz: string;

  constructor() { }
}
