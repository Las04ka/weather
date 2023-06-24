import { IForecast } from 'src/app/interfaces/forecast';

export interface IForecastResponse {
  cod: string;
  message: number;
  cnt: number;
  list: IForecast[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}
