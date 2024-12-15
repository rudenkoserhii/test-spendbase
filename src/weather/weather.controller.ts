import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { Weather } from './weather.entity';
import { UseInterceptors } from '@nestjs/common';
import { WeatherInterceptor } from './weather.interceptor';

@Controller('weather')
export class WeatherController {
  constructor(private weatherService: WeatherService) {}

  @Post()
  async fetchAndSaveWeather(
    @Body() body: { lat: number; lon: number; part: string },
  ): Promise<Weather> {
    const { lat, lon, part } = body || {};
    return this.weatherService.fetchAndSaveWeather(lat, lon, part);
  }

  @Get()
  @UseInterceptors(WeatherInterceptor)
  async getWeather(
    @Query() query: { lat: number; lon: number; part: string },
  ): Promise<Weather> {
    const { lat, lon, part } = query || {};
    return this.weatherService.getWeather(lat, lon, part);
  }
}
