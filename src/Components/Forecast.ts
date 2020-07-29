import { _get } from "../PromisesAPI/Promises";

export interface IWeather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface ICoordinate {
  lon: number;
  lat: number;
}

export interface IMainInfo {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

export interface IWindInfo {
  speed: number;
  deg: number;
}

export interface ICloudInfo {
  all: number;
}

export interface ISystemInfo {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

export interface ICurrentForecast {
  coord: ICoordinate;
  weather: IWeather[];
  base: string;
  main: IMainInfo;
  visibility: number;
  wind: IWindInfo;
  clouds: ICloudInfo;
  dt: number;
  sys: ISystemInfo;
  timezone: number;
  id: number;
  name: string;
  cod: string;
  message: string;
}

export class Forecast {
  public async GetCurrentWeather(
    city: string = "london"
  ): Promise<ICurrentForecast> {
    return _get<ICurrentForecast>(
      ` https://community-open-weather-map.p.rapidapi.com/weather?q=${city}&units=metric`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "05f3ac07ddmshddab675daff97a4p1656f9jsn68a8809dcf1f",
        },
      }
    );
  }
}

/**
 * Static version of API,
 * already instantiated to the default server URL.
 */
export const APIForecast = new Forecast();
