import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IForecastResponse } from 'src/app/interfaces/forecast-response';
import { environment } from 'src/environments/environment.development';

@Injectable()
export class WeatherService {
  apiKey = environment.apiKey;
  apiUrl = environment.apiUrl;

  getWeather(name: string): Observable<IForecastResponse> {
    const options = name
      ? {
          params: new HttpParams()
            .set('q', name)
            .set('cnt', 8)
            .set('lang', 'ua')
            .set('units', 'metric')
            .set('appid', this.apiKey),
        }
      : {};
    return this.http.get<IForecastResponse>(this.apiUrl, options);
  }

  constructor(private http: HttpClient) {}
}
