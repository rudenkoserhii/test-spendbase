import { WeatherPart } from './weather-part-enum.types';

type COORDINATES = {
  lat: number;
  lon: number;
  part?: WeatherPart;
};

export { type COORDINATES };
