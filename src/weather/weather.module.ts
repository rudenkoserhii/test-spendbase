import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import { Weather } from './weather.entity';
import { WeatherInterceptor } from './weather.interceptor';

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
