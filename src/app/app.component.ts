import { Component, OnInit } from '@angular/core';
import { Cities } from 'src/app/constants/cities';
import { IForecastResponse } from 'src/app/interfaces/forecast-response';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  cities = Cities;
  forecastResponse?: IForecastResponse;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.weatherService
      .getWeather(this.cities[0])
      .subscribe((el) => (this.forecastResponse = el));
  }
}
