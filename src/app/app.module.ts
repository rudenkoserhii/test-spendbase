import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WeatherModule } from '../weather/weather.module';
import { DatabaseModule } from '../database/database.module';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

const TTL = 60000;
const LIMIT = 14;

@Module({
  imports: [
    WeatherModule,
    DatabaseModule,
    ThrottlerModule.forRoot([
      {
        ttl: TTL,
        limit: LIMIT,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule { }
