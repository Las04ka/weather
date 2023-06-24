import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, Observable, throwError } from 'rxjs';
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
    return this.http.get<IForecastResponse>(this.apiUrl, options).pipe(
      catchError((err) => {
        console.log(err);
        this.snackBar.open(
          'Something went wrong: ' + err.status + ' ' + err.statusText,
          'close',
          {
            duration: 5000,
          },
        );
        return throwError(() => new Error('Something bad happened'));
      }),
    );
  }

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}
}
