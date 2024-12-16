import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

import { AppController } from 'app/app.controller';
import { AppService } from 'app/app.service';
import { DatabaseModule } from 'database/database.module';
import { WeatherModule } from 'weather/weather.module';

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
