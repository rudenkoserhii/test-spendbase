import { Controller, Post, Body, Get, Query, HttpStatus, UseInterceptors, HttpException } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { DESCRIPTIONS, MESSAGES, ROUTES, SWAGGER } from 'consts';
import { Weather } from 'weather/weather.entity';
import { WeatherInterceptor } from 'weather/weather.interceptor';
import { WeatherService } from 'weather/weather.service';
import { WeatherCoordinatesDto } from 'weather/dto';

@ApiTags(SWAGGER.WEATHER.CONTROLLER.TAGS)
@Controller(ROUTES.WEATHER)
export class WeatherController {
  constructor(private weatherService: WeatherService) { }

  /**
   * @description Fetches weather data based on provided coordinates and saves it in the database.
   * 
   * @param {WeatherCoordinatesDto} coordinates - The coordinates (latitude, longitude) and the part of weather data to fetch.
   * @returns {Promise<Weather>} - The saved weather record.
   * @throws {HttpException} - Throws an exception if the weather data could not be fetched or saved.
   * 
   * @remarks
   * This endpoint uses the OpenWeatherMap API to fetch the weather data based on the provided coordinates
   * and saves the data to the database. The valid values for the "part" field in the `coordinates` DTO
   * are `current`, `hourly`, and `daily`.
   */
  @Post(ROUTES.ROOT)
  @ApiOperation({ summary: SWAGGER.WEATHER.CONTROLLER.FETCH_AND_SAVE })
  @ApiResponse({ status: HttpStatus.OK, type: Weather, description: DESCRIPTIONS.WEATHER_RECORDED })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: MESSAGES.NOT_FOUND })
  async fetchAndSaveWeather(
    @Body() coordinates: WeatherCoordinatesDto,
  ): Promise<Weather> {
    try {
      const weather = await this.weatherService.fetchAndSaveWeather(coordinates);

      return weather;
    } catch (error: any) {
      throw new HttpException(
        error?.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * @description Retrieves weather data for the specified coordinates from the database.
   * 
   * @param {WeatherCoordinatesDto} coordinates - The coordinates (latitude, longitude) and the part of weather data to fetch.
   * @returns {Promise<Weather | null>} - The weather record retrieved from the database.
   * @throws {HttpException} - Throws an exception if the weather data is not found in the database.
   * 
   * @remarks
   * This endpoint fetches weather data (e.g., current weather, hourly forecast, or daily forecast)
   * from the database. If no data is found, a `NOT_FOUND` error is returned.
   */
  @Get(ROUTES.ROOT)
  @ApiOperation({ summary: SWAGGER.WEATHER.CONTROLLER.GET })
  @ApiResponse({ status: HttpStatus.OK, type: Weather, description: DESCRIPTIONS.WEATHER_RECEIVED })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: MESSAGES.NOT_FOUND })
  @UseInterceptors(WeatherInterceptor)
  async getWeather(
    @Query() coordinates: WeatherCoordinatesDto,
  ): Promise<Weather | null> {
    const weather = await this.weatherService.getWeather(coordinates);

    if (!weather) {
      throw new HttpException(
        MESSAGES.NO_WEATHERE_RECORDS,
        HttpStatus.BAD_REQUEST,
      );
    }
    return weather;
  }
}
