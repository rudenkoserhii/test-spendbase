import { Controller, Post, Body, Get, Query, HttpStatus } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { Weather } from './weather.entity';
import { UseInterceptors } from '@nestjs/common';
import { WeatherInterceptor } from './weather.interceptor';
import { MESSAGES, ROUTES, SWAGGER } from 'consts';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { COORDINATES } from 'types';

@ApiTags(SWAGGER.WEATHER.CONTROLLER.TAGS)
@Controller(ROUTES.WEATHER)
export class WeatherController {
  constructor(private weatherService: WeatherService) {}

  @Post(ROUTES.ROOT)
  @ApiOperation({ summary: SWAGGER.WEATHER.CONTROLLER.FETCH_AND_SAVE })
  @ApiResponse({ status: HttpStatus.OK, type: Weather, description: MESSAGES.WEATHER_RECORDED })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: MESSAGES.NOT_FOUND })
  async fetchAndSaveWeather(
    @Body() body: COORDINATES,
  ): Promise<Weather> {
    const { lat, lon, part } = body || {};
    return this.weatherService.fetchAndSaveWeather(lat, lon, part);
  }

  @Get(ROUTES.ROOT)
  @ApiOperation({ summary: SWAGGER.WEATHER.CONTROLLER.GET })
  @ApiResponse({ status: HttpStatus.OK, type: Weather, description: MESSAGES.WEATHER_RECEIVED })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: MESSAGES.NOT_FOUND })
  @UseInterceptors(WeatherInterceptor)
  async getWeather(
    @Query() query: COORDINATES,
  ): Promise<Weather> {
    const { lat, lon, part } = query || {};
    return this.weatherService.getWeather(lat, lon, part);
  }
}
