import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Cities } from 'src/app/constants/cities';
import { DegreeTypes } from 'src/app/constants/degree-types';
import { IForecastResponse } from 'src/app/interfaces/forecast-response';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  degreeTypes = DegreeTypes;
  cities = Cities;
  forecastResponse?: IForecastResponse;
  selectedCity = new FormControl(this.cities[0]);

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.weatherService
      .getWeather(this.cities[0])
      .subscribe((el) => (this.forecastResponse = el));

    this.selectedCity.valueChanges.subscribe((city) => {
      if (city) {
        this.weatherService
          .getWeather(city)
          .subscribe((el) => (this.forecastResponse = el));
      }
    });
  }

  displayTemperature(temp: number, type: string): number {
    type === 'fahrenheit' ? (temp = (temp * 9) / 5 + 32) : temp;
    return temp;
  }
}
