import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WeatherController } from 'weather/weather.controller';
import { Weather } from 'weather/weather.entity';
import { WeatherInterceptor } from 'weather/weather.interceptor';
import { WeatherService } from 'weather/weather.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Weather]),
  ],
  controllers: [WeatherController],
  providers: [
    WeatherService,
    WeatherInterceptor,
  ],
})
export class WeatherModule {}
