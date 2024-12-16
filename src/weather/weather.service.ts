import axios from 'axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Weather } from 'weather/weather.entity';

import { COORDINATES } from 'types';
import { MESSAGES } from 'consts';

const METRIC = 'metric';

@Injectable()
export class WeatherService {
  private readonly apiKey = process.env.OPENWEATHERMAP_API_KEY;
  private readonly url = process.env.OPENWEATHERMAP_URL;

  constructor(
    @InjectRepository(Weather)
    private weatherRepository: Repository<Weather>,
  ) {}

  /**
   * @description Fetches weather data from the OpenWeatherMap API for the given coordinates and part
   * and saves it to the database.
   *
   * @param {COORDINATES} coordinates - The coordinates (latitude, longitude) and the part of weather data to fetch (e.g., 'current', 'hourly', 'daily').
   * @returns {Promise<Weather>} - The saved weather record after saving to the database.
   * @throws {Error} - Throws an error if the OpenWeatherMap API request fails or if there is a database issue.
   *
   * @remarks
   * The data fetched from the OpenWeatherMap API is saved in the `Weather` entity,
   * which contains `lat`, `lon`, `part` (the part of the weather data), and the raw weather data itself.
   */
  async fetchAndSaveWeather(coordinates: COORDINATES): Promise<Weather | null> {
    const { lat, lon, part } = coordinates || {};

    const recordIsExist = await this.weatherRepository.findOne({
      where: { lat, lon, part },
    });

    if (recordIsExist) {
      throw new HttpException(
        MESSAGES.WEATHER_RECORD_EXISTS,
        HttpStatus.BAD_REQUEST,
      );
    }

    const response = await axios.get(this.url, {
      params: {
        lat,
        lon,
        exclude: part,
        appid: this.apiKey,
        units: METRIC,
      },
    });

    if (!response) {
      throw new HttpException(MESSAGES.API_FAILED, HttpStatus.BAD_REQUEST);
    }

    const weatherData = response.data;

    const weather = this.weatherRepository.create({
      lat,
      lon,
      part,
      data: weatherData,
    });

    return this.weatherRepository.save(weather);
  }

  /**
   * @description Retrieves weather data for the given coordinates and part from the database.
   *
   * @param {COORDINATES} coordinates - The coordinates (latitude, longitude) and the part of weather data to fetch (e.g., 'current', 'hourly', 'daily').
   * @returns {Promise<Weather | null>} - The weather data record retrieved from the database.
   * @throws {Error} - Throws an error if the weather data is not found for the provided coordinates and part.
   *
   * @remarks
   * This method looks for an existing weather record in the database matching the provided coordinates and part.
   * If no such record exists, an exception will be thrown.
   */
  async getWeather(coordinates: COORDINATES): Promise<Weather | null> {
    const { lat, lon, part } = coordinates || {};

    return await this.weatherRepository.findOne({
      where: { lat, lon, part },
    });
  }
}
